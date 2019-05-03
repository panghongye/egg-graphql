import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;
  router.get("/", controller.home.index);
  // app.post("/api/user/login", "user.login");
};
