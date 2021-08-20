const User = require('./User');
const UserRelation = require("./UserRelation");
const Blog = require('./Blog');

Blog.belongsTo(User, {
  foreignKey: 'userId'
});

UserRelation.belongsTo(User, {
  foreignKey: 'followingId'
});

User.hasMany(UserRelation, {
  foreignKey: 'userId'
});

Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followingId'
});

module.exports = {
  User,
  UserRelation,
  Blog
};