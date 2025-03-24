import db from "../models/index";
import doctorService from "../service/doctorService";
let getAllDoctors = async (req, res) => {
    try {
        // lấy danh sách bác sĩ với role = R2
        let doctors = await db.User.findAll({
            where: { roleID: "R2" },
            attributes: {
                exclude: ["password"],
            },

            // Join với bảng allcode để lấu position
            include: [
                {
                    model: db.Allcode,
                    as: "positionData", // Tên alias đã định nghĩa trong model
                    attributes: ["valueEn", "valueVi"],
                },
            ],
            raw: true,
            nest: true,
        });

        // tra ve ket quar
        return res.status(200).json({
            errCode: 0,
            data: doctors,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server",
        });
    }
};

let getDetailDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

module.exports = {
    getAllDoctors: getAllDoctors,
    getDetailDoctorById: getDetailDoctorById,
};
