const Router = require('koa-router');
const {loginRedirect} = require("../../middlewares/checkIfLogin");
const router = new Router();


router.get('/login', async (ctx, next) => {
  await ctx.render('login');
});

router.get('/register', async (ctx, next) => {
  await ctx.render('register');
});

router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo);
});

module.exports = router;