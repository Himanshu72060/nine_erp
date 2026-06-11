const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    createTimeTable,

    getClassTimeTable,

    getTeacherSchedule,

    getAllTimeTables,

    getSingleTimeTable,

    updateTimeTable,

    deleteTimeTable

} = require(
    "../controllers/timeTableController"
);

router.post(
    "/",
    auth,
    createTimeTable
);

router.get(
    "/class/:classId/:sessionType",
    auth,
    getClassTimeTable
);

router.get(
    "/teacher/:teacherId",
    auth,
    getTeacherSchedule
);

router.get(
    "/",
    auth,
    getAllTimeTables
);

router.get(
    "/:id",
    auth,
    getSingleTimeTable
);

router.put(
    "/:id",
    auth,
    updateTimeTable
);

router.delete(
    "/:id",
    auth,
    deleteTimeTable
);

module.exports =
    router;