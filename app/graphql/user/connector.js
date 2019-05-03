'use strict';

const DataLoader = require('dataloader');

class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
  }

  fetch(ids) {
    const users = this.ctx.app.model.User.findAll({
      where: {
        id: {
          $in: ids,
        },
      },
    }).then(us => us.map(u => u.toJSON()));
    return users;
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  fetchById(id) {
    return this.loader.load(id);
  }

  async create() {
    const { ctx } = this;
    const createRule = {
      email: { type: 'string' },
      password: { type: 'string' },
    };
    // 校验参数
    ctx.validate(createRule);

    ctx.request.body.name = ctx.request.body.email

    await ctx.model.User.create(ctx.request.body);
    ctx.body = {
      code: 0,
      message: 'success',
    };
  }

  login({ }) {
    const createRule = {
      name: { type: 'string' },
      password: { type: 'string' },
    };
    // 校验参数
    ctx.validate(createRule);
    debugger
  }
}

// module.exports = UserConnector;
module.exports = require('../../controller/user');

