const Router = require('koa-router')
const { loginRedirect } = require('../../middlewares/checkIfLogin')
const { getProfileBlogList } = require('../../controller/blogProfile')
const { getSquareBlogList } = require('../../controller/blogSquare')
const { checkIfUserExists } = require('../../controller/user')
const { getFans, getFollowing } = require('../../controller/userRelation')
const { getHomeBlogList } = require('../../controller/blogHome')
// const { getAtMeCount, getAtMeBlogList, markAsRead } = require('../../controller/blogAt')

const router = Router();

router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo;
    const { id: userId } = userInfo;

    const result = await getHomeBlogList(userId);
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data;

    const fansResult = await getFans(userId);
    const { count: fansCount, fansList } = fansResult.data;

    const followingsResult = await getFollowing(userId);
    console.log(followingsResult);
    const { count: followingsCount, followingsList } = followingsResult.data;

    // const atCountResult = await getAtMeCount(userId)
    // const { count: atCount } = atCountResult.data

    await ctx.render('index', {
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followingsData: {
                count: followingsCount,
                list: followingsList
            },
            // atCount
        },
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName
    if (isMe) {
        curUserInfo = myUserInfo
    } else {
        const existResult = await checkIfUserExists(curUserName)
        if (existResult.errno !== 0) {
            return
        }
        curUserInfo = existResult.data
    }

    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    const fansResult = await getFans(curUserInfo.id)
    const { count: fansCount, fansList } = fansResult.data

    const followingsResult = await getFollowing(curUserInfo.id)
    const { count: followingsCount, followingsList } = followingsResult.data

    const amIFollowed = fansList.some(item => {
        return item.userName === myUserName
    })

    // const atCountResult = await getAtMeCount(myUserInfo.id)
    // const { count: atCount } = atCountResult.data

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followingsData: {
                count: followingsCount,
                list: followingsList
            },
            amIFollowed,
            // atCount
        }
    })
})

router.get('/square', loginRedirect, async (ctx, next) => {
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

// router.get('/at-me', loginRedirect, async (ctx, next) => {
//     const { id: userId } = ctx.session.userInfo
//
//     const atCountResult = await getAtMeCount(userId)
//     const { count: atCount } = atCountResult.data
//
//     const result = await getAtMeBlogList(userId)
//     const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
//
//     await ctx.render('atMe', {
//         atCount,
//         blogData: {
//             isEmpty,
//             blogList,
//             pageSize,
//             pageIndex,
//             count
//         }
//     })

    // if (atCount > 0) {
        // await markAsRead(userId)
    // }
// })

module.exports = router;
