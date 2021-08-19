const seq = require('./utils/sequelize');
const {INTEGER} = require("./utils/TYPE");

const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
    },
    followingId: {
        type: INTEGER,
        allowNull: false,
    }
});

module.exports = UserRelation;
