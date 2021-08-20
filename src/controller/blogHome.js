const xss = require('xss')
const { createBlog, getFollowingsBlogList } = require('../services/blog')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../config/constant')
const { getUserInfo } = require('../services/user')
// const { createAtRelation } = require('../services/at-relation')
const {SuccessResponse, ErrorResponse} = require("./utils/formatResponse");
const {createBlogFailInfo} = require("./utils/errorCodes");

async function create({ userId, content, image }) {
    // // 分析并收集 content 中的 @ 用户
    // // content 格式如 '哈喽 @李四 - lisi 你好 @王五 - wangwu '
    // const atUserNameList = []
    // content = content.replace(
    //     REG_FOR_AT_WHO,
    //     (matchStr, nickName, userName) => {
    //         // 目的不是 replace 而是获取 userName
    //         atUserNameList.push(userName)
    //         return matchStr // 替换不生效，预期
    //     }
    // )

    // const atUserList = await Promise.all(
    //     atUserNameList.map(userName => getUserInfo(userName))
    // )
    //
    // const atUserIdList = atUserList.map(user => user.id)

    try {
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })

        // await Promise.all(atUserIdList.map(
        //     userId => createAtRelation(blog.id, userId)
        // ))

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
    const { count, blogList } = result;

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
