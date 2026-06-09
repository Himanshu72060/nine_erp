const User =
    require("../models/User");


// =======================
// GET PROFILE
// =======================

exports.getProfile =
    async (req, res) => {

        try {

            const student =
                await User.findById(
                    req.user.id
                ).select("-password");

            if (!student) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Student Not Found"
                });

            }

            res.status(200).json({
                success: true,
                data: student
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };


// =======================
// UPDATE PROFILE
// =======================

exports.updateProfile =
    async (req, res) => {

        try {

            const student =
                await User.findByIdAndUpdate(
                    req.user.id,
                    req.body,
                    {
                        new: true
                    }
                ).select("-password");

            res.status(200).json({

                success: true,

                message:
                    "Profile Updated",

                data: student

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
// GET STUDENT DASHBOARD
// =====================================

exports.getDashboard = async (req, res) => {

    try {

        const student =
            await User.findOne({

                _id: req.user.id,

                role: "student"

            }).select("-password");

        if (!student) {

            return res.status(404).json({

                success: false,

                message:
                    "Student not found"

            });

        }

        res.status(200).json({

            success: true,

            message:
                "Dashboard fetched successfully",

            data: {

                studentId:
                    student.studentId,

                rollNumber:
                    student.rollNumber,

                fullName:
                    student.fullName,

                email:
                    student.email,

                subject:
                    student.subject,

                city:
                    student.city,

                state:
                    student.state

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