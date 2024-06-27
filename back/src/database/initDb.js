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
                tecnologia VARCHAR(100),
                online_presencial BOOLEAN DEFAULT TRUE,
                ciudad VARCHAR(255),
                rango_fechas DATE,  -- Cambiado DATERANGE a DATE
                tematica VARCHAR(255) NOT NULL,
                nombre VARCHAR(255) NOT NULL,
                organizador INT,
                codigo_reserva VARCHAR(255),
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
                PRIMARY KEY (usuario_id, evento_id),
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                FOREIGN KEY (evento_id) REFERENCES eventos(id)
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

    console.log("Creando usuario admin");

    await pool.query(`
      INSERT INTO usuarios (nombre, email, contraseña, role) 
      VALUES ('admin', 'admin@example.com', 'admin123', 'admin')
    `);

    console.log("Usuario admin creado!");

    // CREAMOS UN EVENTO DE PRUEBA
    await pool.query(`
      INSERT INTO eventos (nombre, tematica, codigo_reserva) 
      VALUES ('nombrePrueba', 'tematicaPrueba', 'code1')
    `);

    console.log("Evento de prueba creado!");
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

initDB();
