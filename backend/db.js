const mongoose= require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const con = mongoose.connect(process.env.MONGO_URI||"");
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true
    },
    username: {
        type: String,
        maxLength: 50,
        minLength: 3,
        required: true,
        trim: true,
        lowercase: true, 
        unique: true,

    },
    password: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true,
    },
})

const AccountSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    balance : {
        type: Number,
        required: true
    }

})

const Users = new mongoose.model("users",UserSchema);
const Account = new mongoose.model("Account",AccountSchema);

module.exports = {
    Users,
    Account
}