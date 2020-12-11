import { asserts, superoak } from '../../../deps.js';
import { app } from '../../../app.js';

Deno.test({
    name: "GET to /auth/login retuns 200", 
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/auth/login").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET to /auth/login retuns login page title",
    async fn() {
        const testClient = await superoak(app);
        let response = await testClient.get("/auth/login")
        let body = response.text
        asserts.assert(body.includes("<h2>Login!</h2>"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET to /auth/register retuns 200", 
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/auth/register").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET to /auth/register retuns register page title",
    async fn() {
        const testClient = await superoak(app);
        let response = await testClient.get("/auth/register")
        let body = response.text
        asserts.assert(body.includes("<h2>Register</h2>"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "POST to /auth/register with invalid email contains 'Email is not a valid email address'",
    async fn() {
        let testClient = await superoak(app);
        let response = await testClient.post("/auth/register")
        .send('email=notAnEmail@lo.l')
        .send('password=testpassword')
        let body = response.text
        asserts.assert(body.includes("Email is not a valid email address"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "POST to /auth/register with too short password contains 'Password cannot be lower than 4 characters'",
    async fn() {
        let testClient = await superoak(app);
        let response = await testClient.post("/auth/register")
        .send('email=test@email.com')
        .send('password=tes')
        let body = response.text
        asserts.assert(body.includes("Password cannot be lower than 4 characters"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "POST to /auth/register with already registered email contains 'Email is already taken!'",
    async fn() {
        let testClient = await superoak(app);
        let response = await testClient.post("/auth/register")
        .send('email=test@email.com')
        .send('password=testPassword')
        let body = response.text
        asserts.assert(body.includes("Email is already taken!"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "POST to /auth/register with no email contains 'Password is required'",
    async fn() {
        let testClient = await superoak(app);
        let response = await testClient.post("/auth/register")
        .send('email=test@email.com')
        let body = response.text
        asserts.assert(body.includes("Password is required"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "POST to /auth/register with no email contains 'Email is required'",
    async fn() {
        let testClient = await superoak(app);
        let response = await testClient.post("/auth/register")
        .send('password=testPassword')
        let body = response.text
        asserts.assert(body.includes("Email is required"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "POST to /auth/login with incorrect credentials contains 'Invalid email or password'",
    async fn() {
        let testClient = await superoak(app);
        let response = await testClient.post("/auth/login")
        .send('email=test@email.com')
        .send('password=wrongPassword')
        let body = response.text
        asserts.assert(body.includes("Invalid email or password"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "POST to /auth/login with no email contains 'Email is required'",
    async fn() {
        let testClient = await superoak(app);
        let response = await testClient.post("/auth/login")
        .send('password=wrongPassword')
        let body = response.text
        asserts.assert(body.includes("Email is required"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "POST to /auth/login with no password contains 'Password is required'",
    async fn() {
        let testClient = await superoak(app);
        let response = await testClient.post("/auth/login")
        .send('email=test@email.com')
        let body = response.text
        asserts.assert(body.includes("Password is required"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

