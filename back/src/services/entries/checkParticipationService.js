import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const checkParticipationService = async (eventID, eventInfo) => {
    console.log(eventInfo)
    const pool = await getPool();

    for (let user of eventInfo){

        const [isParticipating] = await pool.query(`
                SELECT u.username
                FROM participates p
                JOIN users u ON u.id = p.user_id
                WHERE p.user_id = ? AND p.event_id = ?
            `, [ user.user_id, eventID ]);

        if (!isParticipating[0] || isParticipating[0].length < 1){
            throw generateErrorsUtils(`El usuario ${user.user_id} no está inscrito es este evento.`, 401);
        };

    };
};

export default checkParticipationService;