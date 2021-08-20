const Router = require('koa-router')
const koaFrom = require('formidable-upload-koa')
const {saveFile} = require('../../controller/utils')
const {loginCheck} = require("../../middlewares/checkIfLogin");

const router = Router({
    prefix: '/api/utils'
});

router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
    const file = ctx.req.files['file'];
    if (!file) {
        return;
    }
    const {size, path, name, type} = file;
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path
    });
})

module.exports = router;
