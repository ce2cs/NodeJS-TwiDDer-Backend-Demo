const Koa = require('koa');
const path = require('path')
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const serve = require('koa-static');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');

const { REDIS_CONF } = require('./config/db');
const { isProd } = require('./utils/env');
const { SESSION_SECRET_KEY } = require('./config/secretKeys');

const userViewRouter = require('./routes/view/user');
const errorViewRouter = require('./routes/view/error');
const userAPIRouter = require('./routes/api/user');
const atAPIRouter = require('./routes/api/blogAt');
const squareAPIRouter = require('./routes/api/blogSquare');
const profileAPIRouter = require('./routes/api/blogProfile');
const homeAPIRouter = require('./routes/api/blogHome');
const blogViewRouter = require('./routes/view/blog');
const utilsAPIRouter = require('./routes/api/utils');

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

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'TwiDDer.sid',
  prefix: 'TwiDDer:sess:',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000  // 单位 ms
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(atAPIRouter.routes());
app.use(squareAPIRouter.routes());
app.use(profileAPIRouter.routes());
app.use(homeAPIRouter.routes());
app.use(blogViewRouter.routes());
app.use(utilsAPIRouter.routes());
app.use(userAPIRouter.routes());
app.use(userViewRouter.routes());
app.use(errorViewRouter.routes());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
