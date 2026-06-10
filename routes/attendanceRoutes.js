const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    markAttendance,

    getMyAttendance,

    getAllAttendance,

    getStudentAttendance

} = require(
    "../controllers/attendanceController"
);

router.post(
    "/mark",
    auth,
    markAttendance
);

router.get(
    "/my",
    auth,
    getMyAttendance
);

router.get(
    "/all",
    auth,
    getAllAttendance
);

router.get(
    "/student/:studentId",
    auth,
    getStudentAttendance
);

module.exports =
    router;