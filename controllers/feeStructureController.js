const FeeStructure =
    require(
        "../models/FeeStructure"
    );


// CREATE

exports.createFeeStructure =
    async (req, res) => {

        try {

            const fee =
                await FeeStructure.create(
                    req.body
                );

            res.status(201).json({

                success: true,

                message:
                    "Fee Structure Created",

                data: fee

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

exports.getFeeStructures =
    async (req, res) => {

        try {

            const fees =
                await FeeStructure.find();

            res.status(200).json({

                success: true,

                count:
                    fees.length,

                data:
                    fees

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

exports.getFeeStructure =
    async (req, res) => {

        try {

            const fee =
                await FeeStructure.findById(
                    req.params.id
                );

            if (!fee) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Structure Not Found"

                });

            }

            res.status(200).json({

                success: true,

                data: fee

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// STUDENT FEE

exports.getStudentFee =
    async (req, res) => {

        try {

            const fee =
                await FeeStructure.findOne({

                    studentId:
                        req.params.studentId

                });

            if (!fee) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Record Not Found"

                });

            }

            res.status(200).json({

                success: true,

                data:
                    fee

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

exports.updateFeeStructure =
    async (req, res) => {

        try {

            const fee =
                await FeeStructure.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            if (!fee) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Structure Not Found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Fee Structure Updated",

                data:
                    fee

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

exports.deleteFeeStructure =
    async (req, res) => {

        try {

            const fee =
                await FeeStructure.findByIdAndDelete(
                    req.params.id
                );

            if (!fee) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Structure Not Found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Fee Structure Deleted"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };