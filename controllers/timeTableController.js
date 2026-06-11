exports.createTimeTable =
    async (req, res) => {

        try {

            const existing =
                await TimeTable.findOne({

                    classId:
                        req.body.classId,

                    sessionType:
                        req.body.sessionType,

                    day:
                        req.body.day

                });

            if (existing) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Timetable Already Exists"

                });

            }

            const timetable =
                await TimeTable.create(
                    req.body
                );

            res.status(201).json({

                success: true,

                message:
                    "Time Table Created",

                data:
                    timetable

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

exports.getClassTimeTable =
    async (req, res) => {

        try {

            const data =
                await TimeTable.find({

                    classId:
                        req.params.classId,

                    sessionType:
                        req.params.sessionType

                });

            res.status(200).json({

                success: true,

                data

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };
    
exports.getTeacherSchedule =
    async (req, res) => {

        try {

            const teacherId =
                req.params.teacherId;

            const timetable =
                await TimeTable.find({

                    "periods.teacherId":
                        teacherId

                });

            res.status(200).json({

                success: true,

                data:
                    timetable

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };
    
exports.getAllTimeTables =
    async (req, res) => {

        try {

            const data =
                await TimeTable.find();

            res.status(200).json({

                success: true,

                count:
                    data.length,

                data

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };
    
exports.getSingleTimeTable =
    async (req, res) => {

        try {

            const timetable =
                await TimeTable.findById(
                    req.params.id
                );

            if (!timetable) {

                return res.status(404).json({

                    success: false,

                    message:
                        "TimeTable Not Found"

                });

            }

            res.status(200).json({

                success: true,

                data:
                    timetable

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };
    
exports.updateTimeTable =
    async (req, res) => {

        try {

            const timetable =
                await TimeTable.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.status(200).json({

                success: true,

                message:
                    "TimeTable Updated",

                data:
                    timetable

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };
    
exports.deleteTimeTable =
    async (req, res) => {

        try {

            await TimeTable.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({

                success: true,

                message:
                    "TimeTable Deleted"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };    