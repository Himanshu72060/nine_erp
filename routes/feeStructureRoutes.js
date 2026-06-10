const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    createFeeStructure,

    getFeeStructures,

    getFeeStructure,

    getStudentFee,

    updateFeeStructure,

    deleteFeeStructure

} = require(
    "../controllers/feeStructureController"
);

router.post(
    "/",
    auth,
    createFeeStructure
);

router.get(
    "/",
    auth,
    getFeeStructures
);

router.get(
    "/student/:studentId",
    auth,
    getStudentFee
);

router.get(
    "/:id",
    auth,
    getFeeStructure
);

router.put(
    "/:id",
    auth,
    updateFeeStructure
);

router.delete(
    "/:id",
    auth,
    deleteFeeStructure
);

module.exports =
    router;