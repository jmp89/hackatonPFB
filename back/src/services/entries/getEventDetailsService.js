import getPool from "../../database/getPool.js";

const getEventDetailsService = async (eventID) => {

    const pool = await getPool();

    const eventDetails = await pool.query(`
            SELECT e.nombre,
            e.tecnologia,
            e.online_presencial AS modalidad,
            e.ciudad,
            e.tematica,
            e.organizador,
            e.rango_fechas AS fechas,
            e.rating,
            COUNT(DISTINCT pa.usuario_id) AS participantes,
            COUNT(DISTINCT pe.equipo_id) AS equipos
            FROM eventos e
            LEFT JOIN participa pa ON pa.evento_id = e.id
            LEFT JOIN pertenece pe ON pe.evento_id = e.id
            WHERE e.id = ?
        `, [ eventID ]);

    return eventDetails[0];
};

export default getEventDetailsService;