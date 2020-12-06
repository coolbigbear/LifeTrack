import { executeQuery } from "../database/database.js";

const addUser = async (user) => {
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", user.email, user.password);
}

const getUserByEmail = async (email) => {
    const res = await executeQuery("SELECT * FROM users WHERE email = ($1);", email);
    // console.log(res)
    if (res && res.rowCount > 0) {
        console.log("User found")
        return res.rowsOfObjects()[0];
    }
    
    console.log("User not found")
    return null;
}

const getUserById = async (id) => {
    const res = await executeQuery("SELECT * FROM users WHERE id = ($1);", id);
    // console.log(res)
    if (res && res.rowCount > 0) {
        console.log("User found")
        return res.rowsOfObjects()[0];
    }

    console.log("User not found")
    return null;
}

export { addUser, getUserByEmail, getUserById };