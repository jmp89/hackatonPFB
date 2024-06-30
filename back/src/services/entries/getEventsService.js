import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const getEventsService = async (filter, sort, direction) => {

    const pool = await getPool();
        
    let query = `
        SELECT e.id,
        e.nombre,
        e.tecnologia,
        e.online_presencial,
        e.ciudad,
        e.organizador,
        e.tematica,
        e.rango_fechas,
        e.rating
        FROM eventos e
    `;
    
    if (!filter){
    
        query += `
            ORDER BY rango_fechas ASC
        `;
    
        const eventsList = await pool.query(query);
    
        return eventsList[0];
    };
    
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
    const validDirection = [ "ASC", "DESC" ];
    
    if (sort && !validSort.includes(sort)){
    
        const err = generateErrorsUtils("Parámetros de búsqueda no válidos.");
        throw err;
    };
    
    if (sort){
    
        if (direction && validDirection.includes(direction.toUpperCase())){
                
            query += `
                ORDER BY ${sort} ${direction}
            `;
        } else {
                
            query += `
                ORDER BY ${sort} ASC
            `;
        };
    
    };
    
    const eventsList = await pool.query(query, [
        `%${filter}%`,
        `%${filter}%`,
        `%${filter}%`,
        `%${filter}%`,
        `%${filter}%`
    ]);
    
    return eventsList[0];

};

export default getEventsService;