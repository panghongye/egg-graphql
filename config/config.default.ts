import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1/graphql',
        options: {},
        // mongoose global plugins, expected a function or an array of function and options
        // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
      },
    },
    graphql: {
      router: '/graphql',
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
      // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
      graphiql: true,
      // graphQL 路由前的拦截器
      onPreGraphQL: function* (ctx) { },
      // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
      onPreGraphiQL: function* (ctx) { },
      apolloServerOptions: {
        // rootValue(){}, // the value passed to the first resolve function
        // formatError(err) {}, // a function to apply to every error before sending the response to clients
        // validationRules, // additional GraphQL validation rules to be applied to client-specified queries
        // formatParams, // a function applied for each query in a batch to format parameters before execution
        formatResponse(res, { context: ctx }) {
          res.errors = [ctx.errors]
          return res
        }, // a function applied to each response after execution
        tracing: true, // when set to true, collect and expose trace data in the Apollo Tracing format
        // logFunction, // a function called for logging events such as execution times
        // fieldResolver, // a custom default field resolver
        debug: true, // a boolean that will print additional debug logging if execution errors occur
        cacheControl: true, // when set to true, enable built-in support for Apollo Cache Control
      },
    },
    middleware: ["graphql"],
    proxyworker: {
      port: 10086
    },
    security: {
      csrf: {
        ignore: () => true
      }
    },
    onerror: {
      all(err, ctx) {
        // 在此处定义针对所有响应类型的错误处理方法
        // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
        ctx.body = 'error';
        ctx.status = 500;
      },
      html(err, ctx) {
        // html hander
        ctx.body = '<h3>error</h3>';
        ctx.status = 500;
      },
      json(err, ctx) {
        // json hander
        ctx.body = { message: 'error' };
        ctx.status = 500;
      },
      jsonp(err, ctx) {
        // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
      },
    },
  };

  // use for cookie sign key, should change to your own and keep security
  // config.keys = appInfo.name + "_1556880039998_8698";
  config.keys = "egg-graphql";

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
