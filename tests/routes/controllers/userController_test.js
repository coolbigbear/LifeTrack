import { asserts, superoak } from '../../../deps.js';
import { app } from '../../../app.js';

Deno.test("GET to /auth/login retuns 200", async () => {
    const testClient = await superoak(app);
    await testClient.get("/auth/login").expect(200);
});

// Deno.test("GET to /auth/register retuns 200", async () => {
//     const testClient = await superoak(app);
//     await testClient.get("/auth/register").expect(200);
// });

// Deno.test("GET to /auth/login retuns <h2>Login!</h2>", async () => {
//     const testClient = await superoak(app);
//     let response = await testClient.get("/auth/login");
//     let body = response.text
//     asserts.assert(body.includes("<h2>Login!</h2>"))
// });

// Deno.test("GET to /auth/register retuns <h2>Register!</h2>", async () => {
//     const testClient = await superoak(app);
//     let response = await testClient.get("/auth/register");
//     let body = response.text
//     asserts.assert(body.includes("<h2>Register!</h2>"))
// });

// Deno.test("GET to helloController retuns <h1>Test hello</h1> ", async () => {
//     let testClient = await superoak(app);
//     await testClient.post("/api/hello")
//         .send({ "message": "Testing" })

//     testClient = await superoak(app);
//     let response = await testClient.get("/")
//     let body = response.text
//     assert(body.includes("<h1>Testing</h1>"))
// });

