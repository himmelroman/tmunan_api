const { BaseManyEntity } = require('./base');
const { attribute } = require('@aws/dynamodb-data-mapper-annotations');
const { v4: uuidv4 } = require('uuid');

// Define the Session class extending BaseManyEntity
class Session extends BaseManyEntity {
    constructor(userId, sessionId, usageCount) {
        super(userId, 'session');
        this.sessionId = sessionId || uuidv4();
        this.sk = this.getSK();
        this.usageCount = usageCount || 0;
    }

    getSK() {
        return `${this.entityType}#${this.sessionId}`;
    }
}

// Apply attributes manually
attribute()(Session.prototype, 'usageCount');
attribute()(Session.prototype, 'sessionId');

module.exports = Session;
