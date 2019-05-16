import * as DataLoader from "DataLoader";
import { Controller } from "egg";

export default class UserConnector extends Controller {
  fetch = async ids => {
    const users = await this.ctx.app.model.User.find({
      where: {
        id: {
          $in: ids
        }
      }
    })
    users.length = ids.length
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
    try {
      this.ctx.validate(this.rule, params);
      params.name = params.email
      const user = await this.ctx.model.User.create(params);
      return user
    } catch (error) {
      this.ctx.body = {
        code: 0,
        message: error
      }
      console.info(error)
      return 
    }

    // this.ctx.body = user
  }

  async login(params) {
    const { ctx } = this;
    // 校验参数
    try {
      this.ctx.validate(this.rule, params);
      const user = await ctx.model.User.findOne(params);
      ctx.session.user = user;
      if (!user) {
        ctx.body = {
          code: "10000",
          message: "用户不存在"
        };
      }
      // ctx.body = {
      //   code: "0",
      //   message: "success",
      //   data: user
      // };
      return user

    } catch (error) {
      ctx.body = {
        code: 0,
        message: error
      };
      console.info(error)
      return null
    }
  }
}

// module.exports = UserConnector;
