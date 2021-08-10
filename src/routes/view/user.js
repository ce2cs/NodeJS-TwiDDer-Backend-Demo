const Router = require('koa-router');
const router = new Router();


router.get('/login', async (ctx, next) => {
  await ctx.render('login');
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register');
})

// router.get('/setting', loginRedirect, async (ctx, next) => {
//   await ctx.render('setting');
// })

module.exports = router;