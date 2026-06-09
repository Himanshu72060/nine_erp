const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const role =
    require("../middleware/roleMiddleware");

const {

    getProfile,
    updateProfile,
    getDashboard,
    

} = require(
    "../controllers/studentController"
);


// GET PROFILE

router.get(
    "/profile",
    auth,
    role("student"),
    getProfile
);


// UPDATE PROFILE

router.put(
    "/profile",
    auth,
    role("student"),
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