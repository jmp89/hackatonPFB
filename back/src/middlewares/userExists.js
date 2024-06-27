import getPool from "../database/getPool.js";
import generateErrorsUtils from "../utils/generateErrorsUtils.js";

const userExists = async (req, res, next) => {
  try {
    const pool = await getPool();

    const userId = req.params.userId || req.user?.id;

    const [user] = await pool.query(
      `
                SELECT id FROM usuarios WHERE id=?
            `,
      [userId]
    );

    if (!user.length) {
      throw generateErrorsUtils("Usuario no encontrado", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default userExists;
