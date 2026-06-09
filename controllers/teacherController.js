const User = require("../models/User");


// =====================================
// GET TEACHER PROFILE
// =====================================

exports.getProfile = async (req, res) => {

    try {

        const teacher =
            await User.findOne({

                _id: req.user.id,

                role: "teacher"

            }).select("-password");

        if (!teacher) {

            return res.status(404).json({

                success: false,

                message:
                    "Teacher not found"

            });

        }

        res.status(200).json({

            success: true,

            data: teacher

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};


// =====================================
// UPDATE TEACHER PROFILE
// =====================================

exports.updateProfile = async (req, res) => {

    try {

        const teacher =
            await User.findOne({

                _id: req.user.id,

                role: "teacher"

            });

        if (!teacher) {

            return res.status(404).json({

                success: false,

                message:
                    "Teacher not found"

            });

        }

        const allowedFields = [

            "fullName",
            "mobileNumber",
            "department",
            "specialization",
            "experienceYear",
            "state",
            "city",
            "pincode",
            "fullAddress"

        ];

        allowedFields.forEach(
            (field) => {

                if (
                    req.body[field] !==
                    undefined
                ) {

                    teacher[field] =
                        req.body[field];

                }

            }
        );

        await teacher.save();

        res.status(200).json({

            success: true,

            message:
                "Profile updated successfully",

            data: teacher

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};


// =====================================
// UPDATE TEACHER IMAGE
// =====================================

exports.updateTeacherImage =
    async (req, res) => {

        try {

            const teacher =
                await User.findOne({

                    _id: req.user.id,

                    role: "teacher"

                });

            if (!teacher) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Teacher not found"

                });

            }

            if (!req.file) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Image is required"

                });

            }

            const imageUrl =
                `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

            teacher.teacherImage =
                imageUrl;

            await teacher.save();

            res.status(200).json({

                success: true,

                message:
                    "Teacher image updated successfully",

                image:
                    teacher.teacherImage

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// =====================================
// TEACHER DASHBOARD
// =====================================

exports.getDashboard =
    async (req, res) => {

        try {

            const teacher =
                await User.findOne({

                    _id: req.user.id,

                    role: "teacher"

                }).select("-password");

            if (!teacher) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Teacher not found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Dashboard fetched successfully",

                data: {

                    teacherId:
                        teacher.teacherId,

                    fullName:
                        teacher.fullName,

                    email:
                        teacher.email,

                    department:
                        teacher.department,

                    specialization:
                        teacher.specialization,

                    experienceYear:
                        teacher.experienceYear,

                    city:
                        teacher.city,

                    state:
                        teacher.state,

                    teacherImage:
                        teacher.teacherImage

                }

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };