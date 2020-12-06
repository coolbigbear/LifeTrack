import { send } from '../deps.js'

const log = async ({ request, session }, next) => {
    var user = await session.get('user');
    if (!user) {
        user = {}
        user.id = "anonymous"
    }

    console.log(`${request.url.pathname} - ${request.method} - Userd ID: ${user.id}`);
    await next();
};


const errorMiddleware = async (context, next) => {
    try {
        await next();
    } catch (e) {
        console.log(e);
    }
}

const serveStaticFilesMiddleware = async (context, next) => {
    if (context.request.url.pathname.startsWith('/static')) {
        const path = context.request.url.pathname.substring(7);
        await send(context, path, {
            root: `${Deno.cwd()}/static`
        });
    } else {
        await next();
    }
};

const accessControl = async ({ response, request, session }, next) => {
    var pathname = request.url.pathname;
    if (pathname == "/" || pathname.startsWith("/auth") || pathname.startsWith('/api')) {
        await next();
    } else {
        const user = await session.get('user');
        if (user) {
            await next();
        } else {
            response.redirect('/auth/login')
        }
    }
}

export { log, errorMiddleware, accessControl, serveStaticFilesMiddleware }