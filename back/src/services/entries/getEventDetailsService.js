import getPool from '../../database/getPool.js';

// En getEventDetailsService

const getEventDetailsService = async (eventID) => {
    const pool = await getPool();
    try {
        const [eventDetails] = await pool.query(
            `
            SELECT e.name,
            e.technology,
            e.online_on_site,
            e.city,
            e.category,
            e.organizer,
            e.start_date,
            e.finish_date,
            e.rating,
            COUNT(DISTINCT p.user_id) AS total_participants,
            COUNT(DISTINCT m.team_id) AS total_teams
            FROM events e
            LEFT JOIN participates p ON p.event_id = e.id
            LEFT JOIN member_of m ON m.event_id = e.id
            WHERE e.id = ?
        `,
            [eventID]
        );

        if (!eventDetails) {
            throw new Error('Event details not found');
        }

        return eventDetails;
    } catch (error) {
        console.error('Error fetching event details:', error);
        throw error;
    }
};

export default getEventDetailsService;
