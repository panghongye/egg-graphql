'use strict';

module.exports = {
  Query: {
    user(root, { id }, ctx) {
      return ctx.connector.user.fetchById(id);
    },
    login(root, params, ctx) {
      let a = ctx.validate({ a: 1 }, { a: 1 })
      console.trace(a,1111111111111111)
      debugger
      // return ctx.connector.user.login(params);
    },
    tags(root, params, ctx) {
      return ctx.connector.tag.fetchRecommandation();
    },
  },
  Mutation: {
    createUser(root, params, ctx) {
      return ctx.connector.user.login(params);
    },
  }
};
