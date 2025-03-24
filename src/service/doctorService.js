import db from "../models/index";

let getDetailDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            }

            let doctor = await db.User.findOne({
                where: {
                    id: doctorId,
                    roleID: "R2",
                },
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: db.Allcode,
                        as: "positionData",
                        attributes: ["valueEn", "valueVi"],
                    },
                    {
                        model: db.Markdown,
                        as: "doctorMarkdown",
                        attributes: [
                            "contentHTML",
                            "contentMarkdown",
                            "description",
                        ],
                    },
                ],
                raw: false,
                nest: true,
            });

            if (!doctor) {
                resolve({
                    errCode: 2,
                    errMessage: "Doctor not found",
                });
            }
            // if (doctor.image) {
            //     doctor.image = Buffer.from(doctor.image, "base64").toString(
            //         "binary"
            //     );
            // }

            resolve({
                errCode: 0,
                data: doctor,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    // getAllDoctors: getAllDoctors,
    getDetailDoctorById: getDetailDoctorById,
};
