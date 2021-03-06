import { oak, sqlite } from './deps.ts';

function parseSearch(search: string | undefined): {[k: string]: string} {
  let pairs: string[] = search?.replace(/^\?/, '').split(/&/g) || [];
  return pairs.reduce((m, pair) => {
    let [key, value] = pair.split('=') as string[];
    m[key] = value;
    return m
  }, {} as {[k: string]: string})
}

const router = new oak.Router();
router
  .get("/menu/menuList", async context => {
    // Open a database

    // console.log(Object.keys(context.response));
    // console.log(Object.keys(context.app));
    // console.log(Object.keys(context.state));
    // console.log(Object.keys(context.request));
    // console.log(Object.keys(context.router));
    // console.log(Object.keys(context.params));
    // "response", "app", "state", "request", "router", "params"

    let params = parseSearch(context.request.search);

    console.log(params);

    if (params && params.parentId) {
      const db = await sqlite.open("data.db");
      const result: any[] = [];
      for (const row of db.query(`
        SELECT id, parentId, moduleUrl, moduleName, moduleDescribe, moduleSequence 
        FROM Menu WHERE parentId = ?
        `, [Number(params.parentId)])) {
        let [id, parentId, moduleUrl, moduleName, moduleDescribe, moduleSequence] = row;
        result.push({id, parentId, moduleUrl, moduleName, moduleDescribe, moduleSequence});
      }
      context.response.body = {code: 200, data: result};
      db.close();
      return;
    }
    context.response.body = {code: 200};
  });

const app = new oak.Application();
app.use(async (ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', '*');
  ctx.response.headers.set('Access-Control-Allow-Headers', 'X-Requested-With');
  ctx.response.headers.set('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].join(','));
  await next();
});
// app.use(async context => {
//   console.log(context.request.path);
//   await oak.send(context, context.request.path, {
//     root: `${Deno.cwd()}/../src`,
//     index: "index.html"
//   });
// });
app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({ port: 8000 });
