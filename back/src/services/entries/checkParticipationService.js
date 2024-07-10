import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const checkParticipationService = async (eventInfo) => {

    const pool = await getPool();

    const users = [
        eventInfo.user1,
        eventInfo.user2,
        eventInfo.user3,
        eventInfo.user4,
        eventInfo.user5
    ];

    for (let user of users){

        const isParticipating = await pool.query(`
                SELECT user_id
                FROM participates p
                JOIN users u ON u.id = p.user_id
                WHERE u.name = ? AND p.event_id = ?
            `, [ user, eventInfo.eventID ]);

        if (!isParticipating[0] || isParticipating[0].length < 1){
            throw generateErrorsUtils(`El usuario ${user} no está inscrito es este evento.`, 401);
        };
    };
};

export default checkParticipationService;