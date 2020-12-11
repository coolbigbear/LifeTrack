import { asserts, superoak } from '../../../deps.js';
import { app } from '../../../app.js';
import { showReporting } from '../../../routes/controllers/behaviourController.js';

let usedParameterValue1 = null;
let usedParameterValue2 = null;
const myRenderFunction = (parameterValue1, parameterValue2) => {
    usedParameterValue1 = parameterValue1;
    usedParameterValue2 = parameterValue2;
};

const getAuthenticated = (param) => {
    return true;
};

const myContextGET = {
    session: {
        get: getAuthenticated
    },
    render: myRenderFunction,
    request: {
        method: "GET"
    }
}

Deno.test({
    name: "GET to /behaviour/reporting retuns login page when no credentials are given",
    async fn() {
        const testClient = await superoak(app);
        let response = await testClient.get("/behaviour/reporting")
        let body = response.text
        asserts.assert(body.includes("<h2>Login!</h2>"))
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET to /behaviour/reporting tries to render behaviour reporting ejs file",
    async fn() {
        await showReporting(myContextGET)
        asserts.assert(usedParameterValue1 == "./reporting/reporting.ejs")
    },
    sanitizeResources: false,
    sanitizeOps: false
});

