const bcrypt = require("bcryptjs");

const User = require("../models/User");

const generateToken =
    require("../utils/generateToken");


const fs = require("fs");

const uploadToBunny =
    require("../config/bunnyConfig");



// =============================
// STUDENT SIGNUP
// =============================

exports.studentSignup =
    async (req, res) => {

        try {

            const {

                fullName,
                email,
                mobileNumber,
                password,

                rollNumber,
                parentName,
                dateOfBirth,
                gender,
                subject,

                state,
                city,
                pincode,
                fullAddress

            } = req.body;

            const existingUser =
                await User.findOne({
                    email
                });

            if (existingUser) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Email already registered"
                });

            }

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            const studentId =
                "STU" +
                Date.now();

            const student =
                await User.create({

                    role: "student",

                    fullName,
                    email,
                    mobileNumber,

                    password:
                        hashedPassword,

                    studentId,

                    rollNumber,
                    parentName,
                    dateOfBirth,
                    gender,
                    subject,

                    state,
                    city,
                    pincode,
                    fullAddress

                });

            const token =
                generateToken(student);

            res.status(201).json({

                success: true,

                message:
                    "Student Signup Successful",

                token,

                data: student

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

// =============================
// STUDENT LOGIN
// =============================

exports.studentLogin =
    async (req, res) => {

        try {

            const {
                email,
                studentId,
                password
            } = req.body;

            if (
                (!email && !studentId)
                || !password
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Email/Student ID and Password are required"
                });

            }

            let student;

            if (email) {

                student =
                    await User.findOne({
                        email,
                        role: "student"
                    });

            } else {

                student =
                    await User.findOne({
                        studentId,
                        role: "student"
                    });

            }

            if (!student) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Student not found"
                });

            }

            const isMatch =
                await bcrypt.compare(
                    password,
                    student.password
                );

            if (!isMatch) {

                return res.status(401).json({
                    success: false,
                    message:
                        "Invalid Password"
                });

            }

            const token =
                generateToken(student);

            res.status(200).json({

                success: true,

                message:
                    "Student Login Successful",

                token,

                data: {
                    _id: student._id,
                    studentId:
                        student.studentId,
                    role:
                        student.role,
                    fullName:
                        student.fullName,
                    email:
                        student.email
                }

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

/* ==================================
   TEACHER SIGNUP
================================== */

exports.teacherSignup = async (
    req,
    res
) => {

    try {

        const {
            fullName,
            email,
            mobileNumber,
            password,
            department,
            specialization,
            experienceYear,
            state,
            city,
            pincode,
            fullAddress
        } = req.body;

        const existingUser =
            await User.findOne({
                $or: [
                    { email },
                    { mobileNumber }
                ]
            });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message:
                    "Teacher Already Exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const teacherId =
            "EMP" +
            Date.now();

        let imageUrl = "";

        if (req.file) {

            const fileBuffer =
                fs.readFileSync(
                    req.file.path
                );

            imageUrl =
                await uploadToBunny(

                    fileBuffer,

                    `teachers/${Date.now()}-${req.file.originalname}`

                );

        }

        const teacher =
            await User.create({

                role: "teacher",

                teacherId,

                image: imageUrl,

                fullName,

                email,

                mobileNumber,

                password:
                    hashedPassword,

                department,

                specialization,

                experienceYear,

                state,

                city,

                pincode,

                fullAddress

            });

        const token =
            generateToken(
                teacher
            );

        res.status(201).json({

            success: true,

            message:
                "Teacher Registered Successfully",

            token,

            teacher

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};

/* ==================================
   TEACHER LOGIN
================================== */

exports.teacherLogin = async (
    req,
    res
) => {

    try {

        const {
            email,
            teacherId,
            password
        } = req.body;

        const teacher =
            await User.findOne({

                role:
                    "teacher",

                $or: [
                    { email },
                    { teacherId }
                ]

            });

        if (!teacher) {

            return res.status(404).json({

                success: false,

                message:
                    "Teacher Not Found"

            });

        }

        const isMatch =
            await bcrypt.compare(
                password,
                teacher.password
            );

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid Password"

            });

        }

        const token =
            generateToken(
                teacher
            );

        res.json({

            success: true,

            message:
                "Teacher Login Success",

            token,

            teacher

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};

// =============================
// ADMIN SIGNUP
// =============================

exports.adminSignup =
    async (req, res) => {

        try {

            const {

                fullName,
                email,
                mobileNumber,
                password,

                adminControlKey,
                managementWing,
                systemAccessPin,

                state,
                city,
                pincode,
                fullAddress

            } = req.body;

            const existingUser =
                await User.findOne({
                    email
                });

            if (existingUser) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Email already exists"
                });

            }

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            const adminId =
                "ADM" +
                Date.now();

            const admin =
                await User.create({

                    role: "admin",

                    fullName,
                    email,
                    mobileNumber,

                    password:
                        hashedPassword,

                    adminId,

                    adminControlKey,
                    managementWing,
                    systemAccessPin,

                    state,
                    city,
                    pincode,
                    fullAddress

                });

            const token =
                generateToken(admin);

            res.status(201).json({

                success: true,

                message:
                    "Admin Signup Successful",

                token,

                data: admin

            });

        } catch (error) {

            res.status(500).json({

                success: false,
                message:
                    error.message

            });

        }

    };

// =============================
// ADMIN LOGIN
// =============================

exports.adminLogin =
    async (req, res) => {

        try {

            const {

                email,
                adminId,
                password

            } = req.body;

            let admin;

            if (email) {

                admin =
                    await User.findOne({

                        email,

                        role:
                            "admin"

                    });

            } else {

                admin =
                    await User.findOne({

                        adminId,

                        role:
                            "admin"

                    });

            }

            if (!admin) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Admin Not Found"

                });

            }

            const isMatch =
                await bcrypt.compare(

                    password,

                    admin.password

                );

            if (!isMatch) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid Password"

                });

            }

            const token =
                generateToken(admin);

            res.status(200).json({

                success: true,

                message:
                    "Admin Login Successful",

                token,

                data: {
                    _id:
                        admin._id,
                    adminId:
                        admin.adminId,
                    role:
                        admin.role,
                    fullName:
                        admin.fullName
                }

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

exports.changePassword =
    async (req, res) => {

        try {

            const {
                oldPassword,
                newPassword
            } = req.body;

            const user =
                await User.findById(
                    req.user.id
                );

            const match =
                await bcrypt.compare(
                    oldPassword,
                    user.password
                );

            if (!match) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Old Password Incorrect"

                });

            }

            user.password =
                await bcrypt.hash(
                    newPassword,
                    10
                );

            await user.save();

            res.json({

                success: true,

                message:
                    "Password Changed Successfully"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };