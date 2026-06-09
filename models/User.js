const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // ==================================
        // COMMON FIELDS
        // ==================================

        role: {
            type: String,
            enum: ["student", "teacher", "admin"],
            required: true
        },

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        mobileNumber: {
            type: String,
            required: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        state: {
            type: String,
            trim: true
        },

        city: {
            type: String,
            trim: true
        },

        pincode: {
            type: String,
            trim: true
        },

        fullAddress: {
            type: String,
            trim: true
        },

        isActive: {
            type: Boolean,
            default: true
        },

        // ==================================
        // STUDENT FIELDS
        // ==================================

        studentId: {
            type: String,
            unique: true,
            sparse: true
        },

        rollNumber: {
            type: String,
            trim: true
        },

        parentName: {
            type: String,
            trim: true
        },

        dateOfBirth: {
            type: Date
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"]
        },

        subject: {
            type: String,
            enum: [
                "science",
                "commerce",
                "arts",
                "mathematic",
                "computer"
            ]
        },

        // ==================================
        // TEACHER FIELDS
        // ==================================

        teacherId: {
            type: String,
            unique: true,
            sparse: true
        },

        teacherImage: {
            type: String,
            default: ""
        },

        department: {
            type: String,
            enum: [
                "primary",
                "secondary",
                "higher secondary",
                "administration"
            ]
        },

        specialization: {
            type: String,
            trim: true
        },

        experienceYear: {
            type: Number,
            default: 0
        },

        faceVerified: {
            type: Boolean,
            default: false
        },

        // ==================================
        // ADMIN FIELDS
        // ==================================

        adminId: {
            type: String,
            unique: true,
            sparse: true
        },

        adminControlKey: {
            type: String,
            trim: true
        },

        managementWing: {
            type: String,
            trim: true
        },

        systemAccessPin: {
            type: String,
            trim: true
        },

        // ==================================
        // PASSWORD RESET
        // ==================================

        resetPasswordToken: {
            type: String,
            default: null
        },

        resetPasswordExpire: {
            type: Date,
            default: null
        },

        // ==================================
        // LOGIN TRACKING
        // ==================================

        lastLogin: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "User",
    userSchema
);