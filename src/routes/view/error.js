const Router = require('koa-router')

const router = new Router();

router.get('/get-an-error', async (ctx, next) => {
  ctx.body = {
    msg: 'xxx'
  }
  throw Error()
})

router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router
