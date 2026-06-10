const express =
    require("express");

const router =
    express.Router();

const {

    createFeeStructure,

    getFeeStructures,

    getFeeStructure,

    updateFeeStructure,

    deleteFeeStructure

} = require(
    "../controllers/feeStructureController"
);


router.post(
    "/",
    createFeeStructure
);

router.get(
    "/",
    getFeeStructures
);

router.get(
    "/:id",
    getFeeStructure
);

router.put(
    "/:id",
    updateFeeStructure
);

router.delete(
    "/:id",
    deleteFeeStructure
);

module.exports =
    router;