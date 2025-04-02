import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                });
                console.log("check user", user);
                if (user) {
                    let checkPassword = bcrypt.compareSync(
                        password,
                        user.password
                    );
                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.errMessage = "ok";
                        userData.user = {
                            id: user.id,
                            email: user.email,
                            roleId: user.roleCode,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            phoneNumber: user.phoneNumber,
                        };
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "sai mat khau";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User not found";
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = "User not found";
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getAllCodes = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allcodes = await db.Allcode.findAll({
                where: { type: typeInput },
                attributes: ["keyName", "type", "valueEn", "valueVi"],
            });

            if (allcodes && allcodes.length > 0) {
                resolve({
                    errCode: 0,
                    errMessage: "data fetched successfully",
                    data: allcodes,
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "No data found",
                    data: [],
                });
            }
        } catch (error) {
            reject({
                errCode: -1,
                errMessage: "Error from server",
            });
        }
    });
};

const createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check existing email
            const existingUser = await checkUserEmail(data.email);
            if (existingUser) {
                resolve({
                    errCode: 1,
                    errMessage: "Email already exists"
                });
                return;
            }

            // Hash password
            const hashPassword = await bcrypt.hashSync(data.password, 10);
            
            // Create new user
            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address || null,
                phoneNumber: data.phoneNumber || null,
                genderCode: data.genderCode || null,
                roleCode: data.roleCode || 'R3', // Default role
                positionCode: data.positionCode || null,
                image: data.image || null
            });

            resolve({
                errCode: 0,
                errMessage: "User created successfully"
            });

        } catch (error) {
            reject({
                errCode: -1,
                errMessage: "Error from server"
            });
        }
    });
};

const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                attributes: {
                    exclude: ['password', 'image'], // Exclude sensitive data
                },
                include: [
                    {
                        model: db.Allcode,
                        as: 'genderData',
                        attributes: ['valueEn', 'valueVi']
                    },
                    {
                        model: db.Allcode,
                        as: 'roleData',
                        attributes: ['valueEn', 'valueVi']
                    },
                    {
                        model: db.Allcode,
                        as: 'positionData',
                        attributes: ['valueEn', 'valueVi']
                    }
                ],
                raw: true,
                nest: true
            });

            if (users && users.length > 0) {
                resolve({
                    errCode: 0,
                    errMessage: "Users fetched successfully",
                    data: users
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "No users found",
                    data: []
                });
            }
        } catch (error) {
            reject({
                errCode: -1,
                errMessage: "Error from server"
            });
        }
    });
};

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleCode || !data.positionCode || !data.genderCode) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                });
            }

            let user = await db.User.findOne({
                where: { id: data.id }
            });

            if (user) {
                await user.update({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    genderCode: data.genderCode,
                    roleCode: data.roleCode,
                    positionCode: data.positionCode
                });

                resolve({
                    errCode: 0,
                    errMessage: 'Update user successfully!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });

            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                });
            }

            await db.User.destroy({
                where: { id: userId }
            });

            resolve({
                errCode: 0,
                errMessage: 'User deleted successfully!'
            });
        } catch (e) {
            reject(e);
        }
    });
}
export default {
    handleUserLogin: handleUserLogin,
    getAllCodes: getAllCodes,
    createUser: createUser,
    getAllUsers: getAllUsers,
    updateUser: updateUser,
    deleteUser: deleteUser
};
