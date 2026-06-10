const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    createFeeReport,

    getFeeReports,

    getFeeReport,

    updateFeeReport,

    deleteFeeReport

} = require(
    "../controllers/feeReportController"
);


router.post(
    "/",
    auth,
    createFeeReport
);

router.get(
    "/",
    auth,
    getFeeReports
);

router.get(
    "/:id",
    auth,
    getFeeReport
);

router.put(
    "/:id",
    auth,
    updateFeeReport
);

router.delete(
    "/:id",
    auth,
    deleteFeeReport
);

module.exports =
    router;