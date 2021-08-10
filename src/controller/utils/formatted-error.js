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
    // // 修改基本信息失败
    // changeInfoFailInfo: {
    //     errno: 10008,
    //     message: '修改基本信息失败'
    // },
    // // json schema 校验失败
    // jsonSchemaFileInfo: {
    //     errno: 10009,
    //     message: '数据格式校验错误'
    // },
    // // 删除用户失败
    // deleteUserFailInfo: {
    //     errno: 10010,
    //     message: '删除用户失败'
    // },
    // // 添加关注失败
    // addFollowerFailInfo: {
    //     errno: 10011,
    //     message: '添加关注失败'
    // },
    // // 取消关注失败
    // deleteFollowerFailInfo: {
    //     errno: 10012,
    //     message: '取消关注失败'
    // },
    // // 创建微博失败
    // createBlogFailInfo: {
    //     errno: 11001,
    //     message: '创建微博失败，请重试'
    // },
    // // 删除微博失败
    // deleteBlogFailInfo: {
    //     errno: 11002,
    //     message: '删除微博失败，请重试'
    // }
}
