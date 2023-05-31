const jwt = require("jsonwebtoken");
const KEY = "TRYTRYUNTILYOUSUCCEED";

const authenticateUser = (req, res, next) => {
    try {
        const token = req.header("check-token");
        if (!token) {
            return res.send({ "message": "Not authorized" });
        }
        const data = jwt.verify(token, KEY);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = authenticateUser;