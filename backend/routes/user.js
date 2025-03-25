const { Router } = require("express");
const { SignUpInput, SignInInput, UserEditRequest } = require("../zod/user");
const { Users, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const userRouter = Router();

userRouter.use("/signup", (req, res, next) => {
    const validation = SignUpInput.safeParse(req.body);
    if (!validation.success) {
        res.status(411).json({ message: "Email Already Taken / Incorrect Inputs" });
    }
    else {
        next();
    }
})
userRouter.post("/signup", async (req, res) => {
    try {
        const body = req.body;

        const anyUser = await Users.findOne({ username: body.username });

        if (anyUser) {
            res.status(411).json({ message: "Email Already Taken / Incorrect Inputs" }).end();
            return;
        }

        const newUser = await Users.create(body);

        await Account.create({
            userId: newUser._id,
            balance: Math.floor(1 + Math.random() * 10000)
        })

        const token = jwt.sign({
            userId: newUser._id
        }, JWT_SECRET);

        if (newUser) {
            res.status(200).json({
                message: "User Created Successfully!",
                token
            }).end();
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" }).end();
    }

})


userRouter.use("/signin", (req, res, next) => {
    const { success } = SignInInput.safeParse(req.body);
    if (!success) {
        res.status(411).json({ message: "Error while logging in" }).end();
    }
    next();
})
userRouter.post("/signin", async (req, res) => {
    try {
        const user = await Users.findOne(req.body);

        if (!user) {
            res.status(411).json({
                message: "Invalid Username or Password"
            }).end();
            return;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        res.status(200).json({ token }).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something Went wrong" }).end();
    }
})



userRouter.put("/", authMiddleware, async (req, res) => {

    try {
        const body = req.body;
        const { success } = UserEditRequest.safeParse(body);

        if (!success) {
            res.status(411).json({ message: "Error while updating information" }).end();
            return;
        }

        await Users.updateOne({ _id: req.userId }, body);

        res.status(200).json({ message: "User Updated Succesfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something Went Wrong" }).end();
    }
})

userRouter.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    try {
        const usersArr = await Users.find({
            $or: [
                {
                    firstName: {
                        $regex: new RegExp(filter, 'i')
                    }
                },
                {
                    lastName: {
                        $regex: new RegExp(filter, 'i')
                    }
                }
            ]
        })
        res.json({
            user: usersArr.map(u => {
                return {
                    firstName: u.firstName,
                    lastName: u.lastName,
                    username: u.username,
                    _id: u._id
                }
            }).filter(u => !(u._id == req.userId))
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something Went Wrong" }).end();
        return;
    }
})


module.exports = userRouter