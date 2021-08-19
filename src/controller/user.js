const {getUserInfo, createUser, updateUser, deleteUser} = require("../services/user");
const {SuccessResponse, ErrorResponse} = require('./utils/formatResponse')
const {registerUserNameExistInfo, registerFailInfo, changePasswordFailInfo, loginFailInfo, deleteUserFailInfo,
  changeInfoFailInfo, registerUserNameNotExistInfo
} = require("./utils/errorCodes");
const doCrypto = require("../utils/crypto");


async function checkIfUserExists(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessResponse(userInfo)
  } else {
    return new ErrorResponse(registerUserNameNotExistInfo)
  }
}

async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new ErrorResponse(registerUserNameExistInfo);
  }

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessResponse();
  } catch (e) {
    console.error(e.message, e.stack);
    return new ErrorResponse(registerFailInfo);
  }
}

async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    return new ErrorResponse(loginFailInfo);
  }

  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessResponse();
}

async function deleteCurUser(userName) {
  const result = await deleteUser(userName)
  if (result) {
    return new SuccessResponse();
  }

  return new ErrorResponse(deleteUserFailInfo)
}

async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }

  const result = await updateUser(
      {
        newNickName: nickName,
        newCity: city,
        newPicture: picture
      },
      { userName }
  )
  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessResponse()
  }

  return new ErrorResponse(changeInfoFailInfo)
}

async function changePassword(userName, password, newPassword) {
  const result = await updateUser(
      {
        newPassword: doCrypto(newPassword)
      },
      {
        userName,
        password: doCrypto(password)
      }
  )
  if (result) {
    return new SuccessResponse();
  }
  return new ErrorResponse(changePasswordFailInfo);
}

async function logout(ctx) {
  delete ctx.session.userInfo
  return new SuccessResponse();
}
module.exports = {
  checkIfUserExists,
  login,
  register,
  changeInfo,
  changePassword,
  deleteCurUser,
  logout
};