const Router = require('koa-router')
const {register, checkIfUserExists, deleteCurUser, changeInfo, changePassword, logout} = require('../../controller/user')
const {isTest} = require("../../utils/env");
const userValidator = require("../../validators/user");
const {dataValidator} = require("../../middlewares/dataValidator");
const {loginCheck} = require("../../middlewares/checkIfLogin");
const {login} = require('../../controller/user')
const {getFollowing} = require("../../controller/userRelation");

const router = new Router({
  prefix:'/api/user'
});

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await checkIfUserExists(userName);
})

router.post('/register', dataValidator(userValidator), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    gender
  });
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await login(ctx, userName, password);
})

router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    const { userName } = ctx.session.userInfo;
    ctx.body = await deleteCurUser(userName);
  }
})

router.patch('/changeInfo', loginCheck, dataValidator(userValidator), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body;
  ctx.body = await changeInfo(ctx, { nickName, city, picture });
});

router.patch('/changePassword', loginCheck, dataValidator(userValidator), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body;
  const { userName } = ctx.session.userInfo;
  ctx.body = await changePassword(userName, password, newPassword);
});

router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx);
});

router.get('/getFollowing', loginCheck, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo;
  const result = await getFollowing(userId);
  const { followingsList } = result.data;
  console.log(followingsList);
  const list = followingsList.map(user => {
    return `${user.nickName} - ${user.userName}`
  });
  ctx.body = list;
});

module.exports = router;
