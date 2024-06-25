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
      "DROP TABLE IF EXISTS participaciones. proyectos, equipos, usuarios"
    );

    console.log("Creando tablas...");

    await pool.query(`
            CREATE TABLE usuarios (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                contraseña VARCHAR(100) NOT NULL,
                es_admin BOOLEAN DEFAULT FALSE
            )
      `);

    await pool.query(`
            CREATE TABLE equipos (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                descripcion TEXT
            )
     `);

    await pool.query(`
            CREATE TABLE proyectos (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                descripcion TEXT,
                equipo_id INT REFERENCES equipos(id)
            ) 
    `);

    await pool.query(`
            CREATE TABLE participaciones (
                usuario_id INT REFERENCES usuarios(id),
                equipo_id INT REFERENCES equipos(id),
                PRIMARY KEY (usuario_id, equipo_id)
            )
    `);

    console.log("Tablas creadas!");

    console.log("Creando usuario admin");

    await pool.query(`
      INSERT INTO usuarios (nombre, email, contraseña, es_admin) 
      VALUES ('admin', 'admin@example.com', 'admin123', TRUE)
    `);

    console.log("Usuario admin creado!");

    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

initDB();
