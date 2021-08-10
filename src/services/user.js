const User = require("../model/User");

async function getUserInfo(userName, password) {

  const whereOpt = {
    userName,
  };

  if (password) {
    Object.assign(whereOpt, { password });
  }

  return await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  });
}

module.exports = {
  getUserInfo
};