import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const getEventsService = async (filter, sort, direction) => {

    let query = `
        SELECT e.nombre,
        e.tecnologia,
        e.online_presencial,
        e.ciudad,
        e.organizador,
        e.tematica
        FROM Eventos e
    `

    if (filter){

        query += `
            WHERE e.nombre LIKE ?
            OR e.tecnologia LIKE ?
            OR e.online_presencial LIKE ?
            OR e.organizador LIKE ?
            OR e.tematica LIKE ?
        `
    };

    const validSort = [ "nombre", "tecnologia", "online_presencial", "organizador", "tematica" ];
    const validDirection = [ "ASC", "DESC" ]

    if (validSort.includes(sort) && validDirection.includes(direction?.toUpperCase())){

        query += `
            ORDER BY ${sort} ${direction}
        `;
        // ORDER BY ? ?

    } else if (validSort.includes(sort)){

        query += `
            ORDER BY ${sort} ASC
        `;

    } else {

        const err = generateErrorsUtils("Parámetros no válidos", 401);
        throw err;
    };

    const pool = await getPool();

    const eventsList = await pool.query(query, [
        `%${filter}%`,
        `%${filter}%`,
        `%${filter}%`,
        `%${filter}%`,
        `%${filter}%`
        // sort,
        // direction
    ]);

    return eventsList[0];

};

export default getEventsService;