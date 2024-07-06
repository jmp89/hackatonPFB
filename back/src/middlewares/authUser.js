import jwt from "jsonwebtoken";
import generateErrorsUtils from "../utils/generateErrorsUtils.js";

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateErrorsUtils(
        "Debe iniciar sesión para realizar esta acción",
        403
      );
    }

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (error) {
      throw generateErrorsUtils("Credenciales inválidas", 401);
    }

    req.user = tokenInfo;

    next();
  } catch (error) {
    next(error);
  }
};

export default authUser;
