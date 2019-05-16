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
    },
    middleware: ["graphql"],
    proxyworker: {
      port: 10086
    },
    security: {
      csrf: {
        ignore: () => true
      }
    }
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
