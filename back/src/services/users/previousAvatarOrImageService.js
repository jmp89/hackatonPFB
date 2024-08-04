import getPool from "../../database/getPool.js";

const previousAvatarOrImageService = async (userOrEventID, avatarOrImage) => {

    const pool = await getPool();

    if (avatarOrImage === 'avatar'){

        const [[ previousAvatar ]] = await pool.query(`
                SELECT avatar
                FROM users
                WHERE id = ?
            `, [ userOrEventID ]);

        return previousAvatar.avatar;
    };

    if (avatarOrImage === 'image'){

        const [[ previousImage ]] = await pool.query(`
                SELECT image
                FROM events
                WHERE id = ?
            `, [ userOrEventID ]);

        return previousImage.image;
    };

};

export default previousAvatarOrImageService;