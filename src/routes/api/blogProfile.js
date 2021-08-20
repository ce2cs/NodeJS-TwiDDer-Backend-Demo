const Router = require('koa-router');
const { loginCheck } = require('../../middlewares/checkIfLogin');
const { getProfileBlogList } = require('../../controller/blogProfile');
const { follow, unFollow } = require('../../controller/userRelation');
const { getBlogListStr } = require('../../utils/blog');

const router = Router({
    prefix: '/api/profile'
});

router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params;
    pageIndex = parseInt(pageIndex);
    const result = await getProfileBlogList(userName, pageIndex);

    result.data.blogListTpl = getBlogListStr(result.data.blogList);

    ctx.body = result;
});

router.post('/follow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo;
    const { userId: curUserId } = ctx.request.body;
    ctx.body = await follow(myUserId, curUserId);
});

router.post('/unFollow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo;
    const { userId: curUserId } = ctx.request.body;
    ctx.body = await unFollow(myUserId, curUserId);
});

module.exports = router;
