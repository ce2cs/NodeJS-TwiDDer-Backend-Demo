module.exports = {
    registerUserNameExistInfo: {
        errno: 10001,
        message: 'User already exist'
    },

    registerFailInfo: {
        errno: 10002,
        message: 'register failed'
    },

    registerUserNameNotExistInfo: {
        errno: 10003,
        message: 'Username not exist'
    },

    loginFailInfo: {
        errno: 10004,
        message: 'Login failed, please check username or password'
    },

    loginCheckFailInfo: {
        errno: 10005,
        message: 'You have not login'
    },

    changePasswordFailInfo: {
        errno: 10006,
        message: 'password changing failed'
    },

    uploadFileSizeFailInfo: {
        errno: 10007,
        message: 'upload file exceed size limitation'
    },
    changeInfoFailInfo: {
        errno: 10008,
        message: 'change personal information failed'
    },
    jsonSchemaFileInfo: {
        errno: 10009,
        message: 'json schema check failed'
    },
    deleteUserFailInfo: {
        errno: 10010,
        message: 'failed to delete user'
    },
    followFailInfo: {
        errno: 10011,
        message: 'failed to follow'
    },
    unfollowFailInfo: {
        errno: 10012,
        message: 'failed to cancel the follow'
    },
    createBlogFailInfo: {
        errno: 11001,
        message: 'failed to create blog'
    },
    deleteBlogFailInfo: {
        errno: 11002, message: 'failed to delete blog'
    }
};
