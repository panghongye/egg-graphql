export default (ctx, next) => {
  if (ctx.type !== 'application/json') return next()
  ctx.body = JSON.parse(ctx.body || '{}')
  if (!ctx.graphqlError) return next()
  ctx.body.errorMsg = ctx.errors = ctx.body.graphqlError
  next();
};