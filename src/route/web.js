import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import markdownController from "../controllers/markdownController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.post("/api/login", userController.handleLogin);
  router.get('/api/allcode/get-all', userController.getAllCodes);
  router.post('/api/user/create', userController.createUser);
  router.get('/api/users/get-all', userController.getAllUsers);
  router.post('/api/user/update', userController.updateUser);
  router.post('/api/user/delete', userController.deleteUser);
  return app.use("/", router);
};

module.exports = initWebRoutes;
