const Message =
    require("../models/Message");

exports.getMessages =
    async (req, res) => {

        try {

            const messages =
                await Message.find({

                    $or: [

                        {
                            senderId:
                                req.params.senderId,

                            receiverId:
                                req.params.receiverId
                        },

                        {
                            senderId:
                                req.params.receiverId,

                            receiverId:
                                req.params.senderId
                        }

                    ]

                });

            res.json({

                success: true,

                data:
                    messages

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };