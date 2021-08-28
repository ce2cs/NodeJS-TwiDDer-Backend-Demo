const xss = require('xss')
const {createBlog, getFollowingsBlogList} = require('../services/blog')
const {PAGE_SIZE, REG_FOR_AT_WHO} = require('../config/constant')
const {getUserInfo} = require('../services/user')
const { createAtRelation } = require('../services/atRelation')
const {SuccessResponse, ErrorResponse} = require("./utils/formatResponse");
const {createBlogFailInfo} = require("./utils/errorCodes");

async function create({userId, content, image}) {

    const atUserNameList = [];
    let found = content.matchAll(
        REG_FOR_AT_WHO
    );

    found = [...found];
    if (found) {
        for (let i = 0; i < found.length; i++) {
            console.log(found[i]);
            atUserNameList.push(found[i][1]);
        }
    }

    const atUserList = await Promise.all(
        atUserNameList.map(userName => getUserInfo(userName))
    )

    const atUserIdList = atUserList.map(user => user.id)

    try {
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })

        await Promise.all(atUserIdList.map(
            userId => createAtRelation(blog.id, userId)
        ))

        return new SuccessResponse(blog);
    } catch (e) {
        console.error(e.message, e.stack);
        return new ErrorResponse(createBlogFailInfo);
    }
}

async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowingsBlogList(
        {
            userId,
            pageIndex,
            pageSize: PAGE_SIZE
        }
    );
    const {count, blogList} = result;

    return new SuccessResponse({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    });
}

module.exports = {
    create,
    getHomeBlogList
}
