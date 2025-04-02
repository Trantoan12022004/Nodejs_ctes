import db from "../models/index";
import userServices from "../service/userServices";
import eventServices from "../service/eventServices";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "nhập email và password",
        });
    }
    let userData = await userServices.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user,
    });
};

const getAllCodes = async (req, res) => {
    try {
        let type = req.query.type;
        const response = await userServices.getAllCodes(type);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Get all codes error:", error);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

const createUser = async (req, res) => {
    try {
        const data = req.body;
        if (
            !data.email ||
            !data.password ||
            !data.firstName ||
            !data.lastName
        ) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing required parameters",
            });
        }

        const response = await userServices.createUser(data);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Create user error:", error);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const response = await userServices.getAllUsers();
        return res.status(200).json(response);
    } catch (error) {
        console.error("Get all users error:", error);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let updateUser = async (req, res) => {
    try {
        let data = req.body;
        let message = await userServices.updateUser(data);
        return res.status(200).json(message);
    } catch (e) {
        console.log("Error:", e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let deleteUser = async (req, res) => {
    try {
        let id = req.body.id;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing required parameter!",
            });
        }
        let message = await userServices.deleteUser(id);
        return res.status(200).json(message);
    } catch (e) {
        console.log("Error:", e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};


module.exports = {
    handleLogin: handleLogin,
    getAllCodes: getAllCodes,
    createUser: createUser,
    getAllUsers: getAllUsers,
    updateUser: updateUser,
    deleteUser: deleteUser,
};
