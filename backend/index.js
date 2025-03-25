const express = require("express");
const v1Router = require("./routes/index");
const cors = require("cors");
const Config = require("./config");

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next)=>{
    console.log([req.method, req.url].join(" "));
    next();
});

app.use("/api/v1", v1Router);

app.listen(Config.PORT,()=>{
    console.log("Backend is Up!!");
})