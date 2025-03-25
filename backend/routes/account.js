const { Router } = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const { TransferRequest } = require("../zod/account");
const ObjectId = require("mongoose").Types.ObjectId;
const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    try {
        
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
            //its impossible to not have an account, its a bug if control reaches here
            throw Error("Account not found");
        }

        res.status(200).json({
            balance: account.balance
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" })
    }
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession()
    
    session.startTransaction();
    
    try {
        const { to, amount } = req.body;
        const { success } = TransferRequest.safeParse(req.body);
        if (!success) {
            res.status(400).json({ message: "Invalid Parameters" }).end();
            return;
        }

        const fromAccount = await Account.findOne({ userId: req.userId }).session(session);

        if (!fromAccount || fromAccount.balance < amount) {
            session.abortTransaction();
            res.status(400).json({ message: "Insufficient balance" }).end();
            return;
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount ) {
            session.abortTransaction();
            res.status(400).json({ message: "Account not found" }).end();
            return;
        }

        await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
        await Account.updateOne({userId: to},{$inc: {balance: amount}}).session(session);
        session.commitTransaction();

        res.status(200).json({
            message: "Transfer Successful"
        });

    }
    catch (err) {
        console.log(err);
        session.abortTransaction();
        res.status(500).json({ message: "Something went wrong" }).end();
        return;
    }
})

module.exports = accountRouter
