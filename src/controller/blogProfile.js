const { getBlogListByUser } = require('../services/blog');
const { PAGE_SIZE } = require('../config/constant');
const {SuccessResponse} = require("./utils/formatResponse");

async function getProfileBlogList(userName, pageIndex = 0) {
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE
    });

    const blogList = result.blogList;

    return new SuccessResponse({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    });
}

module.exports = {
    getProfileBlogList
};
