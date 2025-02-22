import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const validateJWT = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers["authorization"];

        if (!token || typeof token !== "string" || !token.startsWith("Bearer ")) {
            return res.status(400).json({
                success: false,
                message: "Invalid token format",
            });
        }

        token = token.replace(/^Bearer\s+/, "");

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist in the database",
            });
        }

        if (user.status === false) {
            return res.status(400).json({
                success: false,
                message: "User has been deactivated",
            });
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token has expired",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Error validating token",
            error: err.message,
        });
    }
};