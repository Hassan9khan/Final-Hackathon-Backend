import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the 'users' collection
      required: true,
    },
    category: {
      type: String,
      enum: ["Wedding Loans", "Home Construction Loans", "Business Startup Loans", "Education Loans"],
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value > 0; 
        },
        message: "Amount must be greater than zero.",
      },
    },
    period: {
      type: Number,
      required: true,
      min: 1, 
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    guarantors: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        cnic: { type: String, required: true },
        location: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Loan", loanSchema);
