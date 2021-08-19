const User = require("../model/User");
const {follow} = require("../controller/userRelation");

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

async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender
  })
  const data = result.dataValues

  await follow(data.id, data.id);

  return data;
}

async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  });

  return result > 0;
}

async function updateUser(
    { newPassword, newNickName, newPicture, newCity },
    { userName, password }
) {
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword;
  }
  if (newNickName) {
    updateData.nickName = newNickName;
  }
  if (newPicture) {
    updateData.picture = newPicture;
  }
  if (newCity) {
    updateData.city = newCity;
  }

  const whereOpt = {
    userName
  };

  if (password) {
    whereOpt.password = password;
  }

  const result = await User.update(updateData, {
    where: whereOpt
  })
  return result[0] > 0;
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
};