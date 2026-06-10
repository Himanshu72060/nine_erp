const Message =
    require("../models/Message");

module.exports =
    (io) => {

        io.on(
            "connection",
            (socket) => {

                console.log(
                    "User Connected"
                );

                socket.on(

                    "join",

                    (userId) => {

                        socket.join(
                            userId
                        );

                    }

                );

                socket.on(

                    "sendMessage",

                    async (data) => {

                        const savedMessage =
                            await Message.create({

                                senderId:
                                    data.senderId,

                                receiverId:
                                    data.receiverId,

                                message:
                                    data.message

                            });

                        io.to(
                            data.receiverId
                        ).emit(

                            "receiveMessage",

                            savedMessage

                        );

                    }

                );

                socket.on(
                    "disconnect",
                    () => {

                        console.log(
                            "User Disconnected"
                        );

                    }
                );

            }
        );

    };