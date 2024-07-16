import getPool from '../../database/getPool.js';

const createEventAdminService = async (eventInfo) => {
    const pool = await getPool();

    await pool.query(
        `
            INSERT INTO events (
                name,
                technology,
                online_on_site,
                location,
                start_date,
                finish_date,
                start_time,
                finish_time,
                theme,
                organizer,
                description
            ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
        `,
        [
            eventInfo.name,
            eventInfo.technology,
            eventInfo.online_on_site,
            eventInfo.location,
            eventInfo.start_date,
            eventInfo.finish_date,
            eventInfo.start_time,
            eventInfo.finish_time,
            eventInfo.theme,
            eventInfo.organizer,
            eventInfo.description,
        ]
    );
};

export default createEventAdminService;
