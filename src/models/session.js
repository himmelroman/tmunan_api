const { BaseManyEntity } = require('./base');
const { attribute } = require('@aws/dynamodb-data-mapper-annotations');
const { v4: uuidv4 } = require('uuid');

// Define the Session class extending BaseManyEntity
class Session extends BaseManyEntity {
    constructor(userId, sessionId, usageCount) {
        super(userId, 'session');
        this.sessionId = sessionId;
        this.usageCount = usageCount || 0;
    }

    getSK() {
        const guid = this.sessionId || uuidv4();
        return `${this.entityType}#${guid}`;
    }
}

// Apply attributes manually
attribute()(Session.prototype, 'usageCount');
attribute()(Session.prototype, 'sessionId');

module.exports = Session;
