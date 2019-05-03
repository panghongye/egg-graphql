import * as DataLoader from "DataLoader";
import { Controller } from "egg";

export default class UserConnector extends Controller {
  fetch = async ids => {
    const users = await this.ctx.app.model.User.findAll({
      where: {
        id: {
          $in: ids
        }
      }
    })
    users.length=ids.length
    return users
  };

  loader: DataLoader<{}, {}> = new DataLoader(this.fetch);

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  fetchById(id) {
    return this.loader.load(id);
  }

  rule = {
    email: { type: "email", required: true, allowEmpty: false },
    password: {
      type: "password",
      required: true,
      allowEmpty: false,
      min: 6
    }
  };

  async create(params) {
    // 校验参数
    this.ctx.validate(this.rule, params);
    params.name = params.email
    const user = await this.ctx.model.User.create(params);
    delete user.password
    this.ctx.body = user
    return user
  }

  async login(params) {
    const { ctx } = this;
    // 校验参数
    this.ctx.validate(this.rule, params);
    const user = await ctx.model.User.findOne({
      where: params
    });
    if (!user) {
      ctx.body = {
        code: "10000",
        message: "用户不存在"
      };
    }

    ctx.session.user = user;
    ctx.body = {
      code: "0",
      message: "success",
      data: user
    };
  }
}

// module.exports = UserConnector;
