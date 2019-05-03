import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {
    sequelize: {
      dialect: "mysql",
      database: "graphql",
      host: "localhost",
      port: "3306",
      username: "root",
      password: "rootroot"
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
  config.keys = "egg-ts";

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
