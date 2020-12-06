import { validate, bcrypt } from '../../deps.js'
import { loginValidationRules, registerValidationRules } from './validationController.js'
import { addUser, getUserByEmail } from '../../services/userService.js'

const showLogin = async (context) => {
    return context.render('./user/login.ejs', await getData(context));
};

const showRegister = async (context) => {
    return context.render('./user/register.ejs', await getData(context));
};

const verifyLogin = async (context) => {
    const data = await getData(context);
    console.log(data)
    const [passes, errors] = await validate(data, loginValidationRules);
    if (!passes) {
        data.errors = errors;
        console.log(data)
        context.render('./user/login.ejs', data);
    } else {
        const user = await getUserByEmail(data.Email)
        console.log(user)

        const errorList = {
            errors: { General: { userNotFound: "Invalid email or password" } }
        }

        if (!user) {
            data.errors = errorList.errors
            context.render('./user/login.ejs', data);
        } else {
            let result = await bcrypt.compare(data.Password, user.password);
            if (!result) {
                console.log("Password didn't match")
                data.errors = errorList.errors
                context.render('./user/login.ejs', data);
            } else {
                await context.session.set('user', {
                    id: user.id,
                    email: user.email
                });
                context.response.redirect('/behaviour/reporting')
            }
        }
    }
};

const verifyRegister = async (context) => {

    const data = await getData(context);
    const [passes, errors] = await validate(data, registerValidationRules);
    if (!passes) {
        data.errors = errors;
        console.log(data)
        context.render('./user/register.ejs', data);
    } else {
        const user = await getUserByEmail(data.Email)
        console.log(user)

        const errorList = {
            errors: { General: { userNotFound: "Email is already taken!" } }
        }

        if (user) {
            data.errors = errorList.errors
            console.log(data)
            context.render('./user/register.ejs', data);
        } else {
            const hash = await bcrypt.hash(data.Password);
            const user = {
                email: data.Email,
                password: hash
            }

            await addUser(user)
            context.response.redirect('/auth/login')
        }
    }
};

const logout = async ({ response, session }) => {

    await session.set('user', null);
    response.redirect('/')
};

const getData = async (context) => {
    const data = {
        Email: "",
        Password: "",
        errors: null,
        user: await context.session.get('user')
    };

    if (context.request.method == "POST") {
        const body = context.request.body();
        const params = await body.value;
        console.log(params)
        data.Email = params.get("email");
        data.Password = params.get("password");
    }

    return data;
};

export { showLogin, showRegister, verifyLogin, verifyRegister, logout };