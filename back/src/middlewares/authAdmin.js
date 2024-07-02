import jwt from "jsonwebtoken";
import generateErrorsUtils from "../utils/generateErrorsUtils.js";
import "dotenv/config";

const authAdmin = async (req, res, next) => {

    try {
        
        const token = req.headers["authorization"];
        const { SECRET } = process.env;

        const cleanedToken = jwt.verify(token, SECRET);

        if (cleanedToken.role !== "admin"){

            const err = generateErrorsUtils("Solamente un administrador puede crear un evento.", 403);
            throw err;
        };

        next();

    } catch (error) {
        next(error);
    }
};

export default authAdmin;