import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    // CORRECTED: Use ObjectId for the user reference
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming your user model is named 'User'
        required: true
    },
    // CORRECTED: Define 'plan' as a String to match the data being sent
    plan: {
        type: String,
        required: true
    },
    credit: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment: {
        type: Boolean,
        default: false
    },
    // CORRECTED: Use the standard Date type
    date: {
        type: Date,
        required: true
    },

});

const transactionModel = mongoose.models.transaction || mongoose.model("transaction", transactionSchema);

export default transactionModel;
