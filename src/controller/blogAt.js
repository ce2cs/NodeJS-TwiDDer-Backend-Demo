const {
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
} = require('../services/atRelation');
const { PAGE_SIZE } = require('../config/constant');
const {SuccessResponse} = require("./utils/formatResponse");

async function getAtMeCount(userId) {
    const count = await getAtRelationCount(userId);
    return new SuccessResponse({
        count
    });
}

async function getAtMeBlogList(userId, pageIndex = 0) {
    const result = await getAtUserBlogList({
        userId,
        pageIndex,
        pageSize: PAGE_SIZE
    });

    const { count, blogList } = result;

    return new SuccessResponse({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    });
}

async function markAsRead(userId) {
    try {
        await updateAtRelation(
            { newIsRead: true },
            { userId, isRead: false }
        );
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    getAtMeCount,
    getAtMeBlogList,
    markAsRead
};
