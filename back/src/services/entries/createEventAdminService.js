import getPool from "../../database/getPool.js";

const createEventAdminService = async (eventInfo) => {
  const pool = await getPool();

  await pool.query(
    `
            INSERT INTO eventos (
                nombre,
                tecnologia,
                online_presencial,
                ciudad,
                rango_fechas,
                tematica,
                organizador,
                descripcion
            ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )
        `,
    [
      eventInfo.nombre,
      eventInfo.tecnologia,
      eventInfo.online_presencial,
      eventInfo.ciudad,
      eventInfo.rango_fechas,
      eventInfo.tematica,
      eventInfo.organizador,
      eventInfo.descripcion,
    ]
  );
};

export default createEventAdminService;
