import express from "express";
import {
  createLoan,
  deleteLoan,
  getAllLoans,
  getLoansByUserId,
  updateLoanStatus,
} from "../controllers/loan.controller.js";

const router = express.Router();

router.post("/loans", createLoan);
router.get("/loans", getAllLoans);
router.get("/loans/user/:userId", getLoansByUserId);
router.put("/loans/:loanId/status", updateLoanStatus);
router.delete("/loans/:loanId", deleteLoan);

export default router
