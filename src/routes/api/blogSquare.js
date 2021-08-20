const Router = require('koa-router')
const { loginCheck } = require('../../middlewares/checkIfLogin')
const { getSquareBlogList } = require('../../controller/blogSquare')
const { getBlogListStr } = require('../../utils/blog')

const router = Router({
    prefix: 'api/square'
});

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params;
    pageIndex = parseInt(pageIndex);
    const result = await getSquareBlogList(pageIndex);
    result.data.blogListTpl = getBlogListStr(result.data.blogList);

    ctx.body = result;
})

module.exports = router;
