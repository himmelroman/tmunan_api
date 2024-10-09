const { attribute, table } = require('@aws/dynamodb-data-mapper-annotations');

// Define the BaseEntity class
class BaseEntity {
  constructor(userId, entityType) {
    this.PK = userId;
    this.entityType = entityType;
    this.SK = this.getSK();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  getSK() {
    return this.entityType;
  }
}

// Apply the attributes and table manually
attribute({ name: 'PK' })(BaseEntity.prototype, 'PK');
attribute({ name: 'SK' })(BaseEntity.prototype, 'SK');
attribute()(BaseEntity.prototype, 'createdAt');
attribute()(BaseEntity.prototype, 'updatedAt');

// Apply the table decorator for the single table
table(process.env.DYNAMODB_TABLE)(BaseEntity);

// Define the BaseManyEntity class that extends BaseEntity
class BaseManyEntity extends BaseEntity {
  getSK() {
    const timestamp = new Date().toISOString();
    return `${this.entityType}#${timestamp}`;
  }
}

module.exports = { BaseEntity, BaseManyEntity };