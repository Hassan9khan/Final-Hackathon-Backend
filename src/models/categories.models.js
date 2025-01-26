import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    subcategories: {
      type: [String], 
      required: true,
    },
    maxLoan: {
      type: Number, 
      required: true,
    },
    loanPeriod: {
      type: Number, 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Category", categorySchema);
