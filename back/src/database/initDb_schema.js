import 'dotenv/config';
import bcrypt from 'bcrypt';
import getPool from './getPool.js';

const { MYSQL_DATABASE } = process.env;

const initDB = async () => {
    try {
        const pool = await getPool();

        console.log('Eliminando base de datos...');

        await pool.query(`DROP DATABASE IF EXISTS ${MYSQL_DATABASE}`);

        console.log(`Creando base de datos ${MYSQL_DATABASE}...`);

        await pool.query(`CREATE DATABASE ${MYSQL_DATABASE}`);

        await pool.query(`USE ${MYSQL_DATABASE}`);

        console.log('Borrando tablas...');

        await pool.query('DROP TABLE IF EXISTS participates, events, users');

        console.log('Creando tablas...');

        await pool.query(`
            CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100) DEFAULT NULL,
                personal_info TEXT DEFAULT NULL,
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registration_code CHAR(15),
                recover_pass_code CHAR(10),
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
                location VARCHAR(255) NOT NULL,
                start_date DATE NOT NULL,
                finish_date DATE NOT NULL,
                start_time TIME NOT NULL,
                finish_time TIME NOT NULL,
                theme VARCHAR(255) NOT NULL,
                description TEXT,
                organizer INT,
                image VARCHAR(100) DEFAULT NULL,
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
                rating_user_event TINYINT CHECK (rating_user_event BETWEEN 1 AND 5),
                user_score INT UNSIGNED,
                PRIMARY KEY (user_id, event_id),
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (event_id) REFERENCES events(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                mofified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
    `);

        console.log('Tablas creadas!');

        console.log('Creando usuario admin...');

        await pool.query(`
      INSERT INTO users (name, email, password, role, active) 
      VALUES ('${process.env.MYSQL_ADMIN_NAME}',
      '${process.env.MYSQL_ADMIN_EMAIL}',
      '${await bcrypt.hash(process.env.MYSQL_ADMIN_PASSWORD, 10)}',
      'admin',
      1)
    `);

        console.log('Usuario admin creado!');
        console.log('Cerrando la conexión.');

        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

initDB();
