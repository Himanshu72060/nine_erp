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

    getAllStudents,
    getAllTeachers,

    deleteUser

} = require(
    "../controllers/adminController"
);


// PROFILE

router.get(
    "/profile",
    auth,
    role("admin"),
    getProfile
);

router.put(
    "/profile",
    auth,
    role("admin"),
    updateProfile
);


// USERS

router.get(
    "/students",
    auth,
    role("admin"),
    getAllStudents
);

router.get(
    "/teachers",
    auth,
    role("admin"),
    getAllTeachers
);

router.delete(
    "/user/:id",
    auth,
    role("admin"),
    deleteUser
);

module.exports =
    router;