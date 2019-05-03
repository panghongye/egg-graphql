'use strict';

module.exports = {
  Query: {
    user(root, { id }, ctx) {
      return ctx.connector.user.fetchById(id);
    },
    login(root,params, ctx) {
      return ctx.connector.user.login(params);
    },
    tags(root, params, ctx) {
      return ctx.connector.tag.fetchRecommandation();
    },
  },
};
