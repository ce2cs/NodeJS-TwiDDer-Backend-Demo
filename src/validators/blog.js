const validate = require('./genValidator');
const Ajv = require('ajv');

const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string',
            maxLength: 255
        }
    }
};

function blogValidator(data = {}) {
    return validate(SCHEMA, data);
}

module.exports = blogValidator;
