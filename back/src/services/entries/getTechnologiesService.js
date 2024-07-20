import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const getTechnologiesService = async () => {

    let pool = await getPool();

    const query = `
      SELECT DISTINCT name
      FROM technologies;
    `;

    const [rows, fields] = await pool.query(query);

    const technologies = rows;

    if (!technologies){
        throw generateErrorsUtils("No se han encontrado tecnologías", 404);
    }

    return technologies;
};

export default getTechnologiesService;