import { required, minLength, isEmail, isDate, isNumeric, isInt, minNumber, maxNumber, config } from '../deps.js'

if (Deno.env.get('TEST_ENVIRONMENT')) {
    console.log("In test environment")
    config.database = {
        hostname: Deno.env.get('TEST_DB_HOSTNAME'),
        database: Deno.env.get('TEST_DB_DATABASE'),
        user: Deno.env.get('TEST_DB_USER'),
        password: Deno.env.get('TEST_DB_PASSWORD'),
        port: Number(Deno.env.get('TEST_DB_PORT'))
    };
} else {
    config.database = {
        hostname: Deno.env.get('DB_HOSTNAME'),
        database: Deno.env.get('DB_DATABASE'),
        user: Deno.env.get('DB_USER'),
        password: Deno.env.get('DB_PASSWORD'),
        port: Number(Deno.env.get('DB_PORT'))
    };
}

export { config }; 