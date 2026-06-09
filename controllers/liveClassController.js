const LiveClass =
    require("../models/LiveClass");


// CREATE

exports.createLiveClass =
    async (req, res) => {

        try {

            const liveClass =
                await LiveClass.create(
                    req.body
                );

            res.status(201).json({

                success: true,

                message:
                    "Live Class Created Successfully",

                data:
                    liveClass

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

exports.getLiveClasses =
    async (req, res) => {

        try {

            const classes =
                await LiveClass.find()
                    .sort({
                        createdAt: -1
                    });

            res.status(200).json({

                success: true,

                count:
                    classes.length,

                data:
                    classes

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

exports.getLiveClass =
    async (req, res) => {

        try {

            const liveClass =
                await LiveClass.findById(
                    req.params.id
                );

            if (!liveClass) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Live Class Not Found"

                });

            }

            res.status(200).json({

                success: true,

                data:
                    liveClass

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

exports.updateLiveClass =
    async (req, res) => {

        try {

            const liveClass =
                await LiveClass.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            if (!liveClass) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Live Class Not Found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Live Class Updated Successfully",

                data:
                    liveClass

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

exports.deleteLiveClass =
    async (req, res) => {

        try {

            const liveClass =
                await LiveClass.findByIdAndDelete(
                    req.params.id
                );

            if (!liveClass) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Live Class Not Found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Live Class Deleted Successfully"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };