const Attendance =
    require("../models/Attendance");


// Teacher Attendance Mark

exports.markAttendance =
    async (req, res) => {

        try {

            if (
                req.user.role !== "teacher" &&
                req.user.role !== "admin"
            ) {

                return res.status(403).json({

                    success: false,

                    message:
                        "Only Teacher Can Mark Attendance"

                });

            }

            const attendance =
                await Attendance.create(
                    req.body
                );

            res.status(201).json({

                success: true,

                message:
                    "Attendance Marked Successfully",

                data:
                    attendance

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// Student Own Attendance

exports.getMyAttendance =
    async (req, res) => {

        try {

            const attendance =
                await Attendance.find({

                    studentId:
                        req.user.studentId

                });

            res.status(200).json({

                success: true,

                count:
                    attendance.length,

                data:
                    attendance

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// Teacher Get All

exports.getAllAttendance =
    async (req, res) => {

        try {

            const attendance =
                await Attendance.find()
                    .sort({
                        createdAt: -1
                    });

            res.status(200).json({

                success: true,

                count:
                    attendance.length,

                data:
                    attendance

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// Single Student Attendance

exports.getStudentAttendance =
    async (req, res) => {

        try {

            const attendance =
                await Attendance.find({

                    studentId:
                        req.params.studentId

                });

            res.status(200).json({

                success: true,

                count:
                    attendance.length,

                data:
                    attendance

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };