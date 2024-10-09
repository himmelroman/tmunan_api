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
attribute()(BaseEntity.prototype, 'PK');
attribute()(BaseEntity.prototype, 'SK');
attribute()(BaseEntity.prototype, 'createdAt');
attribute()(BaseEntity.prototype, 'updatedAt');
table(process.env.DYNAMODB_TABLE)(BaseEntity);

// Define the BaseManyEntity class that extends BaseEntity
class BaseManyEntity extends BaseEntity {
  getSK() {
    const timestamp = new Date().toISOString();
    return `${this.entityType}#${timestamp}`;
  }
}

// Apply the attributes manually for the derived class
attribute()(BaseManyEntity.prototype, 'PK');
attribute()(BaseManyEntity.prototype, 'SK');
attribute()(BaseManyEntity.prototype, 'createdAt');
attribute()(BaseManyEntity.prototype, 'updatedAt');
table(process.env.DYNAMODB_TABLE)(BaseManyEntity);

module.exports = { BaseEntity, BaseManyEntity };
