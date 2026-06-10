const ReportCard =
    require("../models/ReportCard");

exports.createReportCard =
    async (req, res) => {

        try {

            if (
                req.user.role !== "teacher" &&
                req.user.role !== "admin"
            ) {

                return res.status(403).json({

                    success: false,

                    message:
                        "Access Denied"

                });

            }

            const report =
                await ReportCard.create(
                    req.body
                );

            res.status(201).json({

                success: true,

                message:
                    "Report Card Created",

                data: report

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

exports.getMyReportCard =
    async (req, res) => {

        try {

            const reports =
                await ReportCard.find({

                    studentId:
                        req.user.id

                });

            res.json({

                success: true,

                count:
                    reports.length,

                data:
                    reports

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };
    
exports.getAllReportCards =
    async (req, res) => {

        try {

            if (
                req.user.role !== "teacher" &&
                req.user.role !== "admin"
            ) {

                return res.status(403).json({

                    success: false,

                    message:
                        "Access Denied"

                });

            }

            const reports =
                await ReportCard.find();

            res.json({

                success: true,

                count:
                    reports.length,

                data:
                    reports

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };
    
exports.getStudentReportCard =
    async (req, res) => {

        try {

            if (
                req.user.role !== "teacher" &&
                req.user.role !== "admin"
            ) {

                return res.status(403).json({

                    success: false,

                    message:
                        "Access Denied"

                });

            }

            const report =
                await ReportCard.findById(
                    req.params.id
                );

            if (!report) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Report Card Not Found"

                });

            }

            res.json({

                success: true,

                data:
                    report

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

    