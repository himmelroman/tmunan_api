// const { BaseManyEntity } = require('./base');
const { attribute } = require('@aws/dynamodb-data-mapper-annotations');
const { v4: uuidv4 } = require('uuid');

// Define the Session class extending BaseManyEntity
class Session /*extends BaseManyEntity*/ {
  constructor(userId, sessionId, usageCount) {
    // super(userId, 'session');
    this.PK = userId;
    this.entityType = 'session';
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.sessionId = sessionId || uuidv4();
    this.usageCount = usageCount || 0;
    this.SK = this.getSK();
  }

  getSK() {
    return `${this.entityType}#${this.sessionId}`;
  }
}

// Apply attributes manually
attribute({ name: 'PK' })(Session.prototype, 'PK');
attribute({ name: 'SK' })(Session.prototype, 'SK');
attribute()(Session.prototype, 'createdAt');
attribute()(Session.prototype, 'updatedAt');
attribute()(Session.prototype, 'usageCount');
attribute()(Session.prototype, 'sessionId');

table(process.env.DYNAMODB_TABLE)(Session);
// No need to reapply the table decorator; it inherits from BaseEntity

module.exports = Session;