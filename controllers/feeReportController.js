const FeeReport =
    require("../models/FeeReport");


// CREATE

exports.createFeeReport =
    async (req, res) => {

        try {

            const feeReport =
                await FeeReport.create({

                    ...req.body,

                    userId:
                        req.user.id

                });

            res.status(201).json({

                success: true,

                message:
                    "Fee Report Created Successfully",

                data:
                    feeReport

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// GET ALL

exports.getFeeReports =
    async (req, res) => {

        try {

            const reports =
                await FeeReport.find({
                    userId:
                        req.user.id
                });

            res.status(200).json({

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


// GET SINGLE

exports.getFeeReport =
    async (req, res) => {

        try {

            const report =
                await FeeReport.findOne({

                    _id:
                        req.params.id,

                    userId:
                        req.user.id

                });

            if (!report) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Report Not Found"

                });

            }

            res.status(200).json({

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


// UPDATE

exports.updateFeeReport =
    async (req, res) => {

        try {

            const report =
                await FeeReport.findOneAndUpdate(

                    {
                        _id:
                            req.params.id,

                        userId:
                            req.user.id
                    },

                    req.body,

                    {
                        new: true
                    }

                );

            if (!report) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Report Not Found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Fee Report Updated Successfully",

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


// DELETE

exports.deleteFeeReport =
    async (req, res) => {

        try {

            const report =
                await FeeReport.findOneAndDelete({

                    _id:
                        req.params.id,

                    userId:
                        req.user.id

                });

            if (!report) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Report Not Found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Fee Report Deleted Successfully"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };