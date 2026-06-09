const Admission =
    require("../models/Admission");

exports.createAdmission =
    async (req, res) => {

        try {

            const admission =
                await Admission.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                message:
                    "Admission Created Successfully",
                data: admission
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };

exports.getAdmissions =
    async (req, res) => {

        try {

            const admissions =
                await Admission.find()
                    .sort({
                        createdAt: -1
                    });

            res.status(200).json({
                success: true,
                count:
                    admissions.length,
                data:
                    admissions
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };

exports.getAdmission =
    async (req, res) => {

        try {

            const admission =
                await Admission.findById(
                    req.params.id
                );

            if (!admission) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Admission Not Found"
                });

            }

            res.status(200).json({
                success: true,
                data:
                    admission
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };

exports.updateAdmission =
    async (req, res) => {

        try {

            const admission =
                await Admission.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            if (!admission) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Admission Not Found"
                });

            }

            res.status(200).json({
                success: true,
                message:
                    "Admission Updated Successfully",
                data:
                    admission
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };

exports.deleteAdmission =
    async (req, res) => {

        try {

            const admission =
                await Admission.findByIdAndDelete(
                    req.params.id
                );

            if (!admission) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Admission Not Found"
                });

            }

            res.status(200).json({
                success: true,
                message:
                    "Admission Deleted Successfully"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };