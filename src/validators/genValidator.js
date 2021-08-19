const Ajv = require('ajv');

const ajv = new Ajv();

function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data);
    if (!valid) {
        return ajv.errors[0];
    }
}

module.exports = validate;
