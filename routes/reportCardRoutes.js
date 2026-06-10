const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    createReportCard,

    getMyReportCard,

    getAllReportCards,

    getStudentReportCard

} = require(
    "../controllers/reportCardController"
);

router.post(
    "/",
    auth,
    createReportCard
);

router.get(
    "/my-report",
    auth,
    getMyReportCard
);

router.get(
    "/all",
    auth,
    getAllReportCards
);

router.get(
    "/:id",
    auth,
    getStudentReportCard
);

module.exports =
    router;