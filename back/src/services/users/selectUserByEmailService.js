import getPool from "../../database/getPool.js";

const selectUserByEmailService = async (email) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
            SELECT
              id,
              name,
              password,
              email,
              role,
              personal_info,
              avatar,
              active,
              created_at,
              modified_at
            FROM users
            WHERE email = ?
        `,
    [email]
  );

  return user[0];
};

export default selectUserByEmailService;
