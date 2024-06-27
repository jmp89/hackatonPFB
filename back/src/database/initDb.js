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
            CREATE TABLE Usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                contraseña VARCHAR(100) NOT NULL,
                es_admin BOOLEAN DEFAULT FALSE,
                avatar VARCHAR(255),
                codigo_registro VARCHAR(255),
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
    `);

    await pool.query(`
            CREATE TABLE Equipos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                descripcion TEXT,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
    `);

    await pool.query(`
            CREATE TABLE Eventos (
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
                FOREIGN KEY (organizador) REFERENCES Usuarios(id)
            )
    `);

    await pool.query(`
            CREATE TABLE Participa (
                usuario_id INT,
                evento_id INT,
                PRIMARY KEY (usuario_id, evento_id),
                FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
                FOREIGN KEY (evento_id) REFERENCES Eventos(id)
            )
    `);

    await pool.query(`
            CREATE TABLE Pertenece (
                usuario_id INT,
                equipo_id INT,
                evento_id INT,
                PRIMARY KEY (usuario_id, equipo_id, evento_id),
                FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
                FOREIGN KEY (equipo_id) REFERENCES Equipos(id),
                FOREIGN KEY (evento_id) REFERENCES Eventos(id),
                UNIQUE (usuario_id, evento_id)
            )
    `);

    console.log("Tablas creadas!");

    console.log("Creando usuario admin");

    await pool.query(`
      INSERT INTO Usuarios (nombre, email, contraseña, es_admin) 
      VALUES ('admin', 'admin@example.com', 'admin123', TRUE)
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
