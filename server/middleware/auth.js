const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized user!"
            })
        }

        const decoded = jwt.verify(token, process.env.ACCESS_KEY)

        if (!decoded) {
            return res.status(401).json({
                message: "Auth failed!"
            })
        }

        req.user = decoded
        next();
    }
    catch (error) {
        res.status(500).json({
            message: "internal server error!"
        })
    }
}

module.exports = authenticate