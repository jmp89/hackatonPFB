import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const updateEventAdminService = async (eventID, eventInfo) => {
    const pool = await getPool();

    const [existingEvent] = await pool.query(
        `
    SELECT * FROM events WHERE id = ?
  `,
        [eventID]
    );

    if (existingEvent.length === 0) {
        const err = generateErrorsUtils('El evento no existe.', 404);
        throw err;
    }

    await pool.query(
        `
      UPDATE events SET
        name = ?,
        technology = ?,
        online_on_site = ?,
        location = ?,
        start_date = ?,
        finish_date = ?,
        start_time = ?,
        finish_time = ?,
        theme = ?,
        organizer = ?,
        description = ?
      WHERE id = ?
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
            eventID,
        ]
    );
};

export default updateEventAdminService;
