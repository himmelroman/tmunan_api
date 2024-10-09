// models/session.js
const { BaseManyEntity } = require('./base');
const { attribute, hashKey, rangeKey, table } = require('@aws/dynamodb-data-mapper-annotations');
const { v4: uuidv4 } = require('uuid');

class Session extends BaseManyEntity {
    constructor(userId, sessionId, usageCount) {
        super(userId, 'session');
        this.sessionId = sessionId;
        this.usageCount = usageCount || 0; 
    }

    @attribute
    usageCount;

    @attribute
    sessionId;

    getSK() {
        const guid = this.sessionId || uuidv4();
        return `${this.entityType}#${guid}`;
    }
}

module.exports = Session;