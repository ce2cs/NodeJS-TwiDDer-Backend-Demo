const seq = require('./utils/sequelize');
const { INTEGER, STRING, TEXT } = require('./utils/TYPE');

const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
    },
    content: {
        type: TEXT,
        allowNull: false,
    },
    image: {
        type: STRING,
    }
})

module.exports = Blog;
