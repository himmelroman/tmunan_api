const { attribute, table } = require('@aws/dynamodb-data-mapper-annotations');

@table(process.env.DYNAMODB_TABLE)
class BaseEntity {
  @attribute()
  pk;

  @attribute()
  sk;

  @attribute()
  createdAt;

  @attribute()
  updatedAt;

  constructor(userId, entityType) {
    this.pk = userId;
    this.entityType = entityType;
    this.sk = this.getSK();
  }

  getSK() {
    return this.entityType;
  }
}

class BaseManyEntity extends BaseEntity {
  getSK() {
    const timestamp = new Date().toISOString();
    return `${this.entityType}#${timestamp}`;
  }
}

module.exports = { BaseEntity, BaseManyEntity };