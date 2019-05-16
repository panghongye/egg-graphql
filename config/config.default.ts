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
    proxyworker: {
      port: 10086
    },
    middleware: ["graphql"],
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
