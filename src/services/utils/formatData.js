const { REG_FOR_AT_WHO } = require('../../config/constant')
const { format } = require('date-fns')

function _timeFormat(str) {
    return format(new Date(str), 'MM.dd HH:mm')
}

function _formatDBTime(obj) {
    obj.createdAtFormat = _timeFormat(obj.createdAt)
    obj.updatedAtFormat = _timeFormat(obj.updatedAt)
    return obj;
}

function _formatContent(obj) {
    obj.contentFormat = obj.content

    obj.contentFormat = obj.contentFormat.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href="/profile/${userName}">@${nickName}</a>`
        }
    )

    return obj;
}

function formatBlog(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        return list.map(_formatDBTime).map(_formatContent)
    }
    let result = list
    result = _formatDBTime(result)
    result = _formatContent(result)
    return result
}

module.exports = {
    formatBlog
};