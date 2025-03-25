const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
const { Users } = require("./db");

const authMiddleware = async (req, res, next ) => {
    try 
    {

        const {authorization} = req.headers;

        if (!authorization){
            res.status(403).json({message: "Unauthorized"}).end();
            return;
        }

        const token = authorization.split(" ")[1];

        try {
            const decodeddata = jwt.verify(token, JWT_SECRET);
        
            const user = await Users.findOne({id: decodeddata.id})
            if (!user)
            {
                throw Error("User Not Found");
            }

            req.userId = decodeddata.userId;
            next();
        }
        catch(err)
        {
            console.log(err);
            res.status(403).json({message: "Unauthorized"}).end();
            return;
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message: "Something Went Wrong"}).end();
    }
    
}

module.exports = {authMiddleware}