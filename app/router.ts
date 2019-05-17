import { Application } from "egg";

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const { graphqlError } = middleware
  router.get("/", controller.home.index);
  router.all('/graphql', graphqlError)
};
