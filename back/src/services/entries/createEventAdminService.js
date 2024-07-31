import getPool from '../../database/getPool.js';

const createEventAdminService = async (eventInfo, eventImage) => {
    const pool = await getPool();

    const thematics = JSON.parse(eventInfo.thematics);
    const technologies = JSON.parse(eventInfo.technologies);

    await pool.query(
        `
            INSERT INTO events (
                name,
                online_on_site,
                location,
                start_date,
                finish_date,
                start_time,
                finish_time,
                organizer,
                description,
                image
            ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
        `,
        [
            eventInfo.name,
            eventInfo.online_on_site,
            eventInfo.location,
            eventInfo.start_date,
            eventInfo.finish_date,
            eventInfo.start_time,
            eventInfo.finish_time,
            eventInfo.organizer,
            eventInfo.description,
            eventImage
        ]
    );

    const [[eventID]] = await pool.query(
        `
            SELECT id
            FROM events
            WHERE name = ?    
        `,
        [eventInfo.name]
    );

    for (const tech of technologies) {

        const [[techID]] = await pool.query(
            `
                SELECT id
                FROM technologies
                WHERE name = ?
            `,
            [tech]
        );

        await pool.query(
            `
                INSERT INTO technologies_events (event_id, technology_id)
                VALUES ( ?, ? )
            `,
            [eventID.id, techID.id]
        );
    };

    for (const them of thematics) {
        const [[themID]] = await pool.query(
            `
                SELECT id
                FROM thematics
                WHERE name = ?
            `,
            [them]
        );

        await pool.query(
            `
                INSERT INTO thematics_events ( event_id, thematic_id )
                VALUES ( ?, ? )
            `,
            [eventID.id, themID.id]
        );
    };
};

export default createEventAdminService;
