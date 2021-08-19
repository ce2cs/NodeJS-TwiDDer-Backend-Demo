const {
    getUsersByFollowing,
    getFollowingByUser,
    addFollowing,
    deleteFollowing
} = require('../services/userRelation')
const {SuccessResponse, ErrorResponse} = require("./utils/formatResponse");
const {followFailInfo, unfollowFailInfo} = require("./utils/errorCodes");

async function getFans(userId) {
    const { count, userList } = await getUsersByFollowing(userId);

    return new SuccessResponse({
        count,
        fansList: userList
    });
}

async function getFollowing(userId) {
    const { count, userList } = await getFollowingByUser(userId);

    return new SuccessResponse({
        count,
        FollowingsList: userList
    });
}

async function follow(myUserId, curUserId) {
    try {
        await addFollowing(myUserId, curUserId);
        return new SuccessResponse();
    } catch (e) {
        console.error(e);
        return new ErrorResponse(followFailInfo);
    }
}

async function unFollow(myUserId, curUserId) {
    const result = await deleteFollowing(myUserId, curUserId);
    if (result) {
        return new SuccessResponse();
    }
    return new ErrorResponse(unfollowFailInfo);
}

module.exports = {
    getFans,
    getFollowing,
    follow,
    unFollow
}
