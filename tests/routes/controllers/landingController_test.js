import { asserts, superoak } from '../../../deps.js';
import { app } from '../../../app.js';

Deno.test({
    name: "GET to / contains 'Welcome to Lifetrack'",
    async fn() {
        const testClient = await superoak(app);
        let response = await testClient.get("/")
        let body = response.text
        asserts.assert(body.includes("<h2>Welcome to Lifetrack</h2>"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET to / contains either 'Things are looking gloomy today :(' or 'Things are looking bright today :D'",
    async fn() {
        const testClient = await superoak(app);
        let response = await testClient.get("/")
        let body = response.text
        asserts.assert(body.includes("Things are looking gloomy today :(") || body.includes("Things are looking bright today :D"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});


