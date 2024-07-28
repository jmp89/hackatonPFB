import jwt from "jsonwebtoken";
import "dotenv/config";
import generateErrorsUtils from "../utils/generateErrorsUtils.js";

const authUser = (req, res, next) => {

  try {
    
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateErrorsUtils("Debe iniciar sesión.", 401);
    }

    try {
      const accessToken = jwt.verify(authorization, process.env.SECRET);

      req.user = accessToken;
      next();

    } catch (error) {

      if (error.message.includes("jwt expired")) {
        const { refreshToken } = req.cookies;


        if (!refreshToken){
          throw generateErrorsUtils("Debe iniciar sesión.", 401);
        }

        try {
          const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

          const tokenInfo = {
            id: decodedRefreshToken.id,
            role: decodedRefreshToken.role,
          };

          const newAccessToken = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: 60 * 15,
          });
          
          req.newAccessToken = newAccessToken;
          req.user = tokenInfo;
          
          next();

        } catch (err) {

          delete req.headers["authorization"];
          res.clearCookie("refreshToken");
          throw generateErrorsUtils("Debe iniciar sesión.", 401);
        };

      } else {

        throw generateErrorsUtils("Debe iniciar sesión.", 401);
      };
    };

  } catch (error) {

    next(error);
  };
};

export default authUser;