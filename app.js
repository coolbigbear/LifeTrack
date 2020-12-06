import { Application, Session } from "./deps.js";
import { viewEngine, engineFactory, adapterFactory } from "./deps.js";
import { router } from "./routes/routes.js";
import * as middleware from './middlewares/middlewares.js';

const app = new Application();
const session = new Session({ framework: "oak" });
await session.init();

app.use(session.use()(session));

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {
  viewRoot: "./views"
}));

app.use(middleware.errorMiddleware);
app.use(middleware.serveStaticFilesMiddleware)
app.use(middleware.log);
app.use(middleware.accessControl)
app.use(router.routes());

if (!Deno.env.get('TEST_ENVIRONMENT')) {
  let port = 7777;
  if (Deno.args.length > 0) {
    const lastArgument = Deno.args[Deno.args.length - 1];
    port = Number(lastArgument);
  }
  app.listen({ port: port });
}
      
export { app };