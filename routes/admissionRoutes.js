const express =
    require("express");

const router =
    express.Router();

const {

    createAdmission,

    getAdmissions,

    getAdmission,

    updateAdmission,

    deleteAdmission

} = require(
    "../controllers/admissionController"
);


// CREATE

router.post(
    "/",
    createAdmission
);


// GET ALL

router.get(
    "/",
    getAdmissions
);


// GET SINGLE

router.get(
    "/:id",
    getAdmission
);


// UPDATE

router.put(
    "/:id",
    updateAdmission
);


// DELETE

router.delete(
    "/:id",
    deleteAdmission
);


module.exports =
    router;