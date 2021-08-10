const Koa = require('koa');
const path = require('path')
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const serve = require('koa-static');

const { REDIS_CONF } = require('./config/db');
const { isProd } = require('./utils/env');
const { SESSION_SECRET_KEY } = require('./config/secretKeys');

// const blogViewRouter = require('./routes/view/blog')
const userViewRouter = require('./routes/view/user');
const errorViewRouter = require('./routes/view/error');
const userAPIRouter = require('./routes/api/user');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(serve(__dirname + '/public'));
app.use(serve(path.join(__dirname, '..', 'uploadFiles')))
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(userAPIRouter.routes());
app.use(userViewRouter.routes());
app.use(errorViewRouter.routes());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
