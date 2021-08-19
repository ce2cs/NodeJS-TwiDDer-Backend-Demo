const {ErrorResponse} = require("../controller/utils/formatResponse");
const {loginFailInfo} = require("../controller/utils/errorCodes");

async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next();
        return;
    }
    ctx.body = new ErrorResponse(loginFailInfo);
}

async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next();
        return;
    }
    const curUrl = ctx.url;
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl));
}

module.exports = {
    loginCheck,
    loginRedirect
};


;