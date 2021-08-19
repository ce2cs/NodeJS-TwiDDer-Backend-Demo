const {ErrorResponse} = require("../controller/utils/formatResponse");
const {jsonSchemaFileInfo} = require("../controller/utils/errorCodes");

function dataValidator(validateFunction) {
    async function validator(ctx, next) {
        const data = ctx.request.body;
        const error = validateFunction(data);
        if (error) {
            ctx.body = new ErrorResponse(jsonSchemaFileInfo);
            return;
        }
        await next();
    }
    return validator
}

module.exports = {
   dataValidator
};