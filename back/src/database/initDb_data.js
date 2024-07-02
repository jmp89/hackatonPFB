import getPool from "./getPool.js";

const initDb_data = async () => {
  try {
    const pool = await getPool();

    console.log("Conexión establecida.");
    console.log("Poblando tabla 'usuarios'...");

    await pool.query(`
                INSERT INTO usuarios (nombre, email, contraseña, active)
                VALUES
                ("user01_test123", "juanmaciasperez89@gmail.com", "$2b$10$81b3IBiTE3ISeyEBbCHwp.whmEzZkKN1pLuLarbyFzY7wMAHfoMxK", 1),
                ("user02_test321", "user02@test.com", "$2b$10$0WfVbW07bLFPwmt/qL7qQ.lNz9U5xadAoAw5sj5eQpNZ8E9bggCUK", 1),
                ("user03_123test", "user03@test.com", "$2b$10$ghy3imG2g0Ms06E0jtUNG.W6X2fevVl86lnRTMZ2DoIQyGaXME7pW", 1),
                ("user04_321test", "user04@test.com", "$2b$10$2oSdypiBYIPuGrfuY7/4lu9bHmU4umgzOZqOykHP2bE9Y/t9CcJOy", 1),
                ("user05_user123", "user05@test.com", "$2b$10$9vm4fUJwr6P0DUjbW.ASSOxDRYZSEGaHpx1as/WbA78tsuc3KkHPW", 1),
                ("user06_user321", "user06@test.com", "$2b$10$nK1Ewz.JqL1ZpLqukArhMOpxN1up9CFscb48DzyaWiM6zyaEKHlsO", 1),
                ("user07_123user", "user07@test.com", "$2b$10$GYdtxP8HgK0..hQXJYGjZe4ca7M8VdLuF2n2gGNsrJVGhVlCYoFGu", 1),
                ("user08_321user", "user08@test.com", "$2b$10$cCBrRBxWoH4/txgcHxtWf.II07mAAl/ZcH1eTDaWs2LD5rtg2iRcS", 1),
                ("user09_pass123", "user09@test.com", "$2b$10$caWQ36hFqdWmOlKvUPxkzeLyAx0aA26UDD6HUFmHXcnhbqdXOGF.e", 1),
                ("user10_pass321", "user10@test.com", "$2b$10$LjitD6YxmKy.MzqB/zVehePco3GGxAh7h9Ack2vXAcfKSvRAxr/ce", 1)
            `);

    console.log("Tabla 'usuarios' poblada correctamente.");
    console.log("Poblando tabla 'eventos'...");

    await pool.query(`
                INSERT INTO eventos (tecnologia, online_presencial, ciudad, rango_fechas, tematica, nombre, descripcion)
                VALUES
                ("Python", 1, "A Coruña", "2024/05/22", "Coding Race", "Python Race Hackathon", "esta es la descripcion del evento 1"),
                ("JavaScript", 1, "A Coruña", "2024/08/13", "Gaming with JavaScript", "JSGaming", "esta es la descripcion del evento 2"),
                ("React", 1, "Madrid", "2024/07/24", "Top Developers", "Selecting best React developers", "esta es la descripcion del evento 3"),
                ("Next", 1, "Barcelona", "2024/02/05", "Coding Race", "App development Race with Next", "esta es la descripcion del evento 4"),
                ("Python", 1, "Madrid", "2024/11/17", "Coding", "Python AI development", "esta es la descripcion del evento 5"),
                ("JavaScript", 1, "Barcelona", "2024/06/08", "Coding Race", "API development with JS Race", "esta es la descripcion del evento 6")
            `);

    console.log("Tabla 'eventos' poblada correctamente.");
    console.log("Poblando tabla 'participa'...");

    await pool.query(`
                INSERT INTO participa (usuario_id, evento_id, codigo_reserva)
                VALUES
                (1, 1, NULL),
                (3, 1, NULL),
                (5, 1, NULL),
                (7, 1, NULL),
                (9, 1, NULL),
                (2, 2, NULL),
                (4, 2, NULL),
                (6, 2, NULL),
                (8, 2, NULL),
                (10, 2, NULL),
                (1, 3, NULL),
                (2, 3, NULL),
                (5, 3, NULL),
                (6, 3, NULL),
                (8, 3, NULL),
                (3, 4, "testCode"),
                (4, 4, NULL),
                (7, 4, NULL),
                (9, 4, NULL),
                (10, 4, NULL),
                (3, 5, NULL),
                (7, 5, NULL),
                (4, 5, NULL),
                (8, 5, NULL),
                (10, 5, NULL),
                (2, 6, NULL),
                (1, 6, NULL),
                (5, 6, NULL),
                (8, 6, NULL),
                (9, 6, NULL)
            `);

    console.log("Tabla 'participa' poblada correctamente.");
    console.log("Poblando tabla 'equipos'...");

    await pool.query(`
                INSERT INTO equipos (nombre, descripcion)
                VALUES
                ("Code Crusaders", "Innovadores en búsqueda de nuevas soluciones de software"),
                ("Byte Busters", "Especialistas en depuración y optimización de código"),
                ("Hack Heroes", "Creadores de herramientas tecnológicas para un futuro mejor"),
                ("Pixel Pirates", "Diseñadores gráficos con un toque revolucionario"),
                ("Script Sentries", "Defensores del código limpio y eficiente"),
                ("Nerd Ninjas", "Maestros de la programación ágil y rápida"),
                ("Syntax Squad", "Expertos en encontrar y corregir errores de sintaxis"),
                ("Quantum Quokkas", "Pioneros en tecnologías avanzadas y computación cuántica"),
                ("Data Dynamos", "Analistas de datos con habilidades excepcionales"),
                ("Tech Titans", "Líderes en desarrollo tecnológico y software innovador"),
                ("Logic Legends", "Solucionadores de problemas con pensamiento lógico afilado"),
                ("Algorithm Avengers", "Creadores de algoritmos potentes y eficientes")
            `);

    console.log("Tabla 'equipos' poblada correctamente.");
    console.log("Poblando tabla 'pertenece'...");

    await pool.query(`
                INSERT INTO pertenece (usuario_id, equipo_id, evento_id)
                VALUES
                (1, 1, 1),
                (3, 1, 1),
                (5, 2, 1),
                (7, 2, 1),
                (2, 3, 2),
                (4, 3, 2),
                (6, 4, 2),
                (8, 4, 2),
                (1, 5, 3),
                (2, 5, 3),
                (5, 6, 3),
                (6, 6, 3),
                (3, 7, 4),
                (4, 7, 4),
                (7, 8, 4),
                (9, 8, 4),
                (3, 9, 5),
                (7, 9, 5),
                (4, 10, 5),
                (8, 10, 5),
                (2, 11, 6),
                (1, 11, 6),
                (5, 12, 6),
                (8, 12, 6)
            `);

    console.log("Tabla 'pertenece' poblada correctamente.");
    console.log("Cerrando la conexión.");

    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

initDb_data();
