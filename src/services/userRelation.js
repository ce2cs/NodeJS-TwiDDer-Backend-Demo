const { User, UserRelation } = require('../model/index')
const Sequelize = require('sequelize')

async function getUsersByFollowing(FollowingId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    FollowingId,
                    userId: {
                        [Sequelize.Op.ne]: FollowingId
                    }
                }
            }
        ]
    });
    
    let userList = result.rows.map(row => row.dataValues) 
    return {
        count: result.count,
        userList
    };
}

async function getFollowingsByUser(userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'userName', 'nickName', 'picture']
            }
        ],
        where: {
            userId,
            FollowingId: {
                [Sequelize.Op.ne]: userId
            }
        }
    });

    let userList = result.rows.map(row => row.dataValues)

    userList = userList.map(item => {
        let user = item.user
        user = user.dataValues
        return user
    })

    return {
        count: result.count,
        userList
    }
}

async function addFollowing(userId, FollowingId) {
    const result = await UserRelation.create({
        userId,
        FollowingId
    });
    return result.dataValues;
}

async function deleteFollowing(userId, FollowingId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            FollowingId
        }
    });
    return result > 0;
}

module.exports = {
    getUsersByFollowing,
    addFollowing,
    deleteFollowing,
    getFollowingsByUser
};
