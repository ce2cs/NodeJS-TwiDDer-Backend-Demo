const Router = require('koa-router');
const { loginCheck } = require('../../middlewares/checkIfLogin');
const { create } = require('../../controller/blogHome');
const { dataValidator } = require('../../middlewares/dataValidator');
const blogValidate = require('../../validators/blog');
const { getHomeBlogList } = require('../../controller/blogHome');
const { getBlogListStr } = require('../../utils/blog');

const router = Router({
    prefix:'/api/blog'
});

router.post('/create', loginCheck, dataValidator(blogValidate), async (ctx, next) => {
    const { content, image } = ctx.request.body;
    const { id: userId } = ctx.session.userInfo;
    ctx.body = await create({ userId, content, image });
});

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params;
    pageIndex = parseInt(pageIndex);
    const { id: userId } = ctx.session.userInfo;
    const result = await getHomeBlogList(userId, pageIndex);
    result.data.blogListTpl = getBlogListStr(result.data.blogList);

    ctx.body = result;
});

module.exports = router;
