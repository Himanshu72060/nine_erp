const mongoose =
    require("mongoose");

const feeStructureSchema =
    new mongoose.Schema(
        {

            category: {
                type: String,
                required: true,
                enum: [
                    "Monthly",
                    "Annual",
                    "Exam",
                    "Sports"
                ]
            },

            amount: {
                type: Number,
                required: true
            },

            dueDate: {
                type: String,
                required: true
            },

            isMandatory: {
                type: Boolean,
                default: true
            }

        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "FeeStructure",
        feeStructureSchema
    );