const Router = require('koa-router')
const {checkIfUserExists} = require('../../controller/user')

const router = new Router({
  prefix:'/api/user'
});

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await checkIfUserExists(userName);
})

module.exports = router;
