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
  package: "egg-graphql"
};

plugin.validate = {
  package: "egg-validate"
};

export default plugin;
