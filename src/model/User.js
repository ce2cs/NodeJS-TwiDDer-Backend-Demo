const seq = require('./utils/sequelize')
const { STRING, DECIMAL } = require('./utils/TYPE')

const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  nickName: {
    type: STRING,
    allowNull: false,
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
  },
  picture: {
    type: STRING,
  },
  city: {
    type: STRING,
  }
});

module.exports = User;