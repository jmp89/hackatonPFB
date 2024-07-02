import getPool from "./getPool.js";

const initDB = async () => {
  try {
    let pool = await getPool();

    console.log("Eliminando base de datos...");

    await pool.query("DROP DATABASE IF EXISTS hackathon");

    console.log("Creando base de datos hackathon...");

    await pool.query("CREATE DATABASE hackathon");

    await pool.query("USE hackathon");

    console.log("Borrando tablas...");

    await pool.query(
      "DROP TABLE IF EXISTS participates, member_of, events, teams, users"
    );

    console.log("Creando tablas...");

    await pool.query(`
            CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100) DEFAULT NULL,
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registration_code CHAR(30),
                recover_pass_code CHAR(10),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
    `);

    await pool.query(`
            CREATE TABLE teams (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
    `);

    await pool.query(`
            CREATE TABLE events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                technology VARCHAR(100) NOT NULL,
                online_on_site ENUM("online", "on_site") DEFAULT 'online' NOT NULL,
                city VARCHAR(255),
                date_range DATE NOT NULL,  -- Cambiado DATERANGE a DATE
                category VARCHAR(255) NOT NULL,
                description TEXT,
                organizer INT,
                rating TINYINT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (organizer) REFERENCES users(id)
            )
    `);

    await pool.query(`
            CREATE TABLE participates (
                user_id INT,
                event_id INT,
                reservation_code VARCHAR(255),
                active BOOLEAN DEFAULT false,
                PRIMARY KEY (user_id, event_id),
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (event_id) REFERENCES events(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                mofified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
    `);

    await pool.query(`
            CREATE TABLE member_of (
                user_id INT,
                team_id INT,
                event_id INT,
                PRIMARY KEY (user_id, team_id, event_id),
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (team_id) REFERENCES teams(id),
                FOREIGN KEY (event_id) REFERENCES events(id),
                UNIQUE (user_id, event_id)
            )
    `);

    console.log("Tablas creadas!");

    console.log("Creando usuario admin...");

    await pool.query(`
      INSERT INTO users (name, email, password, role, active) 
      VALUES ('admin', 'admin@example.com', '$2b$10$uRV5tpsAM4lrZDVM2L/cQeaycXQr6GYcsybzcsxZ6Nj3GZCW3IdJ6', 'admin', 1)
    `);

    console.log("Usuario admin creado!");
    console.log("Cerrando la conexión.");

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initDB();
