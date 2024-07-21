import generateErrorsUtils from "../utils/generateErrorsUtils.js";

const authAdmin = async (req, res, next) => {

    try {
        
        const role = req.user.role;

        if (role !== "admin"){
            throw generateErrorsUtils("Solamente un administrador puede realizar esta acción.", 403);
        };

        next();

    } catch (error) {

        next(error);
    };
};

export default authAdmin;