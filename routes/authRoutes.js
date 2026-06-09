const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    studentSignup,
    studentLogin,

    teacherSignup,
    teacherLogin,

    adminSignup,
    adminLogin,

    changePassword

} = require(
    "../controllers/authController"
);


const upload =
    require(
        "../middleware/uploadMiddleware"
    );

const {
    body
} = require(
    "express-validator"
);

const {
    validate
} = require(
    "../middleware/validationMiddleware"
);




router.post(

    "/student/signup",

    [

        body("fullName")
            .notEmpty(),

        body("email")
            .isEmail(),

        body("mobileNumber")
            .isLength({
                min: 10,
                max: 10
            }),

        body("password")
            .isLength({
                min: 6
            })

    ],

    validate,

    studentSignup

);


router.post(
    "/student/login",
    studentLogin
);

router.post(
    "/teacher/signup",
    upload.single(
        "teacherImage"
    ),
    teacherSignup
);

router.post(
    "/teacher/login",
    teacherLogin
);

router.post(
    "/admin/signup",
    adminSignup
);

router.post(
    "/admin/login",
    adminLogin
);

router.put(
    "/change-password",

    auth,

    changePassword
);



module.exports =
    router;