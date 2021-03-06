import { Client, Pool } from "../deps.js";
import { config } from "../config/config.js";

const CONCURRENT_CONNECTIONS = 4;

const connectionPool = new Pool(config.database, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, ...args) => {
    const client = await connectionPool.connect()
    try {
        return await client.query(query, ...args);
    } catch (e) {
        console.log(e);
    } finally {
        await client.release();
    }
}

// const client = new Client(config.database)
// const executeQuery = async (query, ...args) => {
//     try {
//         await client.connect();
//         return await client.query(query, ...args);
//     } catch (e) {
//         console.log(e);
//     } finally {
//         await client.end();
//     }
// }


export { executeQuery };