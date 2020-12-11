import { asserts, superoak } from '../../../deps.js';
import { app } from '../../../app.js';

Deno.test({
    name: "GET to /api/summary retuns 200",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/summary").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: 'GET to /api/summary/2090/01/01 retuns {"summary": {"message": "No data"}} for date where no data is available',
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/summary/2090/01/01")
            .expect({ "summary": { "message": "No data" } })
    },
    sanitizeResources: false,
    sanitizeOps: false
});

