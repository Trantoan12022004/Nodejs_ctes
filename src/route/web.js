import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import markdownController from "../controllers/markdownController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/delete-user", userController.handleDeleteUser);
  router.post('/api/update-user', userController.handleUpdateUser);
  router.post('/api/create-user', userController.handleCreateUser);
  router.get('/allcode', userController.getAllCode);
  router.get('/api/get-all-doctors', doctorController.getAllDoctors);
  router.post('/api/create-markdown', markdownController.handleCreateMarkdown);
  router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
  return app.use("/", router);
};

module.exports = initWebRoutes;
