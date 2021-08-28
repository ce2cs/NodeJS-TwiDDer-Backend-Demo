const {AtRelation, Blog, User} = require('../model/index')
const {formatBlog} = require('./utils/formatData')

async function createAtRelation(blogId, userId) {
    const result = await AtRelation.create({
        blogId,
        userId
    });
    return result.dataValues;
}

async function getAtRelationCount(userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    });
    return result.count;
}

async function getAtUserBlogList({userId, pageIndex, pageSize = 10}) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: AtRelation,
                attributes: ['userId', 'blogId'],
                where: {userId}
            },
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            }
        ]
    });

    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = blogItem.user.dataValues;
        return blogItem;
    })

    return {
        count: result.count,
        blogList
    };
}

async function updateAtRelation(
    {newIsRead},
    {userId, isRead}
) {
    const updateData = {}
    if (newIsRead) {
        updateData.isRead = newIsRead;
    }

    const whereData = {}
    if (userId) {
        whereData.userId = userId;
    }
    if (isRead) {
        whereData.isRead = isRead;
    }

    const result = await AtRelation.update(updateData, {
        where: whereData
    });
    return result[0] > 0;
}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
};
