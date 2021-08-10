const {getUserInfo} = require("../services/user");
const {registerUserNameNotExistInfo} = require("./utils/formatted-error");
const {SuccessResponse, ErrorResponse} = require('./utils/format-response')


async function checkIfUserExists(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessResponse(userInfo)
  } else {
    return new ErrorResponse(registerUserNameNotExistInfo)
  }
}

module.exports = {
  checkIfUserExists
};