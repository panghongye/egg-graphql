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
    try {
      this.ctx.validate(this.rule, params);  // 校验参数
      params.name = params.email
      const user = await this.ctx.model.User.create(params);
      return user
    } catch (error) {
      return
    }
  }

  async login(params) {
    const { ctx } = this;
    try {
      ctx.validate(this.rule, params); // 校验参数  
    } catch (error) {
      ctx.errorMsg = {
        msg: '请输入正确的邮箱格式，且密码不少于6位！'
      }
      return
    }

    try {
      const user = await ctx.model.User.findOne(params);
      ctx.session.user = user;
      if (!user) ctx.errorMsg = {
        msg: '您还未注册！'
      }
      return user
    } catch (error) {
      ctx.errorMsg = {
        msg: '网络错误请重试！'
      }
      ctx.logger.error(new Error(error));
      return
    }
  }
}

