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

  async create(ctx) {
    const createRule = {
      name: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    };
    // 校验参数
    ctx.validate(createRule);

    const user = await ctx.model.User.create(ctx.request.body);
    ctx.body = {
      code: 0,
      message: 'success',
      data: {
        user: {
          name: user.name,
        },
      },
    };
  };

  async login(ctx) {
    const createRule = {
      name: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    };
    // 校验参数
    ctx.validate(createRule);

    const user = await ctx.model.User.findOne({
      where: ctx.request.body,
    });
    if (!user) {
      ctx.body = {
        code: '10000',
        message: '用户不存在',
      };
    }

    ctx.session.user = user;
    ctx.body = {
      code: '0',
      message: 'success',
      data: user,
    };
  };


}

module.exports = UserConnector;

