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
      "DROP TABLE IF EXISTS Participa, Pertenece, Eventos, Equipos, Usuarios"
    );

    console.log("Creando tablas...");

    await pool.query(`
            CREATE TABLE usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                contraseña VARCHAR(100) NOT NULL,
                avatar VARCHAR(100) DEFAULT NULL,
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
    `);

    await pool.query(`
            CREATE TABLE equipos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                descripcion TEXT,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
    `);

    await pool.query(`
            CREATE TABLE eventos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                tecnologia VARCHAR(100) NOT NULL,
                online_presencial ENUM("online", "presencial") NOT NULL,
                ciudad VARCHAR(255),
                rango_fechas DATE NOT NULL,  -- Cambiado DATERANGE a DATE
                tematica VARCHAR(255) NOT NULL,
                nombre VARCHAR(255) NOT NULL,
                descripcion TEXT,
                organizador INT,
                rating TINYINT,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (organizador) REFERENCES usuarios(id)
            )
    `);

    await pool.query(`
            CREATE TABLE participa (
                usuario_id INT,
                evento_id INT,
                codigo_reserva VARCHAR(255),
                active BOOLEAN DEFAULT false,
                PRIMARY KEY (usuario_id, evento_id),
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                FOREIGN KEY (evento_id) REFERENCES eventos(id),
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
    `);

    await pool.query(`
            CREATE TABLE pertenece (
                usuario_id INT,
                equipo_id INT,
                evento_id INT,
                PRIMARY KEY (usuario_id, equipo_id, evento_id),
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                FOREIGN KEY (equipo_id) REFERENCES equipos(id),
                FOREIGN KEY (evento_id) REFERENCES eventos(id),
                UNIQUE (usuario_id, evento_id)
            )
    `);

    console.log("Tablas creadas!");

    console.log("Creando usuario admin...");

    await pool.query(`
      INSERT INTO usuarios (nombre, email, contraseña, role, active) 
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
