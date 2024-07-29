import getPool from "../../database/getPool.js";

const selectUserByEmailService = async (email) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
            SELECT
              id,
              name,
              surname,
              username,
              password,
              email,
              role,
              personal_info,
              avatar,
              active,
              created_at,
              recover_pass_code
            FROM users
            WHERE email = ?
        `,
    [email]
  );

  return user[0];
};

export default selectUserByEmailService;
