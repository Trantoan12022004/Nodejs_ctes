import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import eventController from "../controllers/eventController";
import doctorController from "../controllers/doctorController";
import markdownController from "../controllers/markdownController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.post("/api/login", userController.handleLogin);
    router.get("/api/allcode/get-all", userController.getAllCodes);
    router.post("/api/user/create", userController.createUser);
    router.get("/api/users/get-all", userController.getAllUsers);
    router.post("/api/user/update", userController.updateUser);
    router.post("/api/user/delete", userController.deleteUser);
    router.post("/api/event/create", eventController.createEvent);
    router.post("/api/event-description/create", eventController.createEventDescription);
    router.get("/api/events/get-recent", eventController.getRecentEvents);
    router.get("/api/event/:id", eventController.getEventById);
    router.get("/api/events/get-all", eventController.getAllEvents);
    router.post("/api/event/register", eventController.registerEvent);
    router.get("/api/events/registrations/:id", eventController.getEventRegistrationsById);
    router.post("/api/events/registration-update", eventController.updateEventRegistration);
    router.post('/api/events/registration-delete', eventController.deleteEventRegistration);
    return app.use("/", router);
};

module.exports = initWebRoutes;
