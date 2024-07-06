import getPool from "../../database/getPool.js";

const createEventAdminService = async (eventInfo) => {

  const pool = await getPool();

  await pool.query(
    `
            INSERT INTO events (
                name,
                technology,
                online_on_site,
                city,
                start_date,
                finish_date,
                category,
                organizer,
                description
            ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )
        `,[
            eventInfo.name,
            eventInfo.technology,
            eventInfo.online_on_site,
            eventInfo.city,
            eventInfo.start_date,
            eventInfo.finish_date,
            eventInfo.category,
            eventInfo.organizer,
            eventInfo.description,
          ]
  );
};

export default createEventAdminService;
