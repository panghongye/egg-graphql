import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  static: true,
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  graphql: {
    enable: true,
    package: "@switchdog/egg-graphql"
  },
  validate: {
    enable: true,
    package: "egg-validate"
  },
};

export default plugin;
