import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  static: true
};

plugin.sequelize = {
  enable: true,
  package: "egg-sequelize"
};

plugin.graphql = {
  enable: true,
  package: "@switchdog/egg-graphql"
};

plugin.validate = {
  enable: true,
  package: "egg-validate"
};

export default plugin;
