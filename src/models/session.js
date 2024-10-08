// models/session.js
const { BaseManyEntity } = require('./base');
const { attribute, hashKey, rangeKey, table } = require('@aws/dynamodb-data-mapper-annotations');

class Session extends BaseManyEntity {
    constructor() {
        super('session'); 
    }

    @attribute
    usageCount;

    @attribute
    sessionId;
}

module.exports = { Session };