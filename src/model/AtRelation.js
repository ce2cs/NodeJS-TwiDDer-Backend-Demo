const seq = require('./utils/sequelize')
const { INTEGER, BOOLEAN } = require('./utils/TYPE')

const AtRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
})

module.exports = AtRelation
