import express from "express";
import path from "path";
import {loadNuxt} from "nuxt";
import serverlessExpress from '@vendia/serverless-express';

let serverlessExpressInstance;

async function setup (event, context) {
  const __dirname = path.resolve();
  const app = express();
  const nuxt = await loadNuxt('start');
  app.use('/images', express.static(path.join(__dirname, 'static', 'images'), { maxAge: 31536000 }));
  app.use('/videos', express.static(path.join(__dirname, 'static', 'videos'), { maxAge: 31536000 }));
  app.use(nuxt.render);
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

export function nuxt(event, context) {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context);

  return setup(event, context);
}