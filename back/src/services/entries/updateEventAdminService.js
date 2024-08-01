import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const updateEventAdminService = async (eventID, eventInfo, eventImage) => {
    const pool = await getPool();

    const thematics = JSON.parse(eventInfo.thematics);
    const technologies = JSON.parse(eventInfo.technologies);

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

    let query = (
        `
      UPDATE events SET
        name = ?,
        online_on_site = ?,
        location = ?,
        start_date = ?,
        finish_date = ?,
        start_time = ?,
        finish_time = ?,
        organizer = ?,
        description = ?
    `)

    const params = [
        eventInfo.name,
        eventInfo.online_on_site,
        eventInfo.location,
        eventInfo.start_date,
        eventInfo.finish_date,
        eventInfo.start_time,
        eventInfo.finish_time,
        eventInfo.organizer,
        eventInfo.description,
    ];

    if (eventImage && eventImage.length > 0){

        query += `, image = ? WHERE id = ?`;

        params.push(eventImage);

    } else {
        
        query += `WHERE id = ?`;

    };
    
    params.push(eventID);

    await pool.query(query, params);

    await pool.query(`
            DELETE FROM technologies_events WHERE event_id = ?
        `, [ eventID ]);

    await pool.query(`
            DELETE FROM thematics_events WHERE event_id = ?
        `, [ eventID ]);

    for ( const tech of technologies ){

        const [[ techID ]] = await pool.query(`
            SELECT id
            FROM technologies
            WHERE name = ?
        `, [ tech ]);
    
    await pool.query(`
            INSERT INTO technologies_events (event_id, technology_id)
            VALUES ( ?, ? )
        `, [ eventID, techID.id ]);
    };
    
    for ( const them of thematics ){
    
        const [[ themID ]] = await pool.query(`
            SELECT id
            FROM thematics
            WHERE name = ?
        `, [ them ]);
    
        await pool.query(`
            INSERT INTO thematics_events ( event_id, thematic_id )
            VALUES ( ?, ? )
        `, [ eventID, themID.id ]);
    };

};

export default updateEventAdminService;
