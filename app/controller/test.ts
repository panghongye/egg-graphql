import { Controller } from "egg";

export default class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.session.user = { test: 'test' }
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.body = ctx.request.body
  }
}
