const express =
    require("express");

const router =
    express.Router();

const auth =
    require(
        "../middleware/authMiddleware"
    );

const role =
    require(
        "../middleware/roleMiddleware"
    );

const {

    getProfile,
    updateProfile,
    getDashboard

} = require(
    "../controllers/teacherController"
);


// GET PROFILE

router.get(

    "/profile",

    auth,

    role(
        "teacher"
    ),

    getProfile

);


// UPDATE PROFILE

router.put(

    "/profile",

    auth,

    role(
        "teacher"
    ),

    updateProfile

);

// GET DASHBOARD
router.get(
    "/dashboard",
    auth,
    role("student"),
    getDashboard
);

module.exports =
    router;