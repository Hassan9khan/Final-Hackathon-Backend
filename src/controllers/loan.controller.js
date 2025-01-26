import Loan from "../models/loan.model.js";

// Create a new loan
const createLoan = async (req, res) => {
  try {
    const { userId, category, subcategory, amount, period, guarantors } =
      req.body;

    // Validate required fields
    if (
      !userId ||
      !category ||
      !subcategory ||
      !amount ||
      !period ||
      !guarantors
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new loan
    const loan = new Loan({
      userId,
      category,
      subcategory,
      amount,
      period,
      guarantors,
    });

    await loan.save();

    res.status(201).json({ message: "Loan created successfully", loan });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all loans (Admin functionality)
const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate("userId", "name email"); // Populate user info
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get loans by user ID
const getLoansByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const loans = await Loan.find({ userId });

    if (!loans || loans.length === 0) {
      return res.status(404).json({ error: "No loans found for this user" });
    }

    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update loan status
const updateLoanStatus = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const loan = await Loan.findByIdAndUpdate(
      loanId,
      { status },
      { new: true } 
    );

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    res.status(200).json({ message: "Loan status updated successfully", loan });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a loan
const deleteLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findByIdAndDelete(loanId);

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  createLoan,
  getAllLoans,
  getLoansByUserId,
  updateLoanStatus,
  deleteLoan,
};
