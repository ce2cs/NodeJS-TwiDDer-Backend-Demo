const { PAGE_SIZE } = require('../config/constant')
const { getSquareCacheList, getSquareListFromDB } = require('../cache/blog')
const {SuccessResponse} = require("./utils/formatResponse");

async function getSquareBlogList(pageIndex = 0) {
    const result = await getSquareCacheList(pageIndex, PAGE_SIZE);
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
    getSquareBlogList
}