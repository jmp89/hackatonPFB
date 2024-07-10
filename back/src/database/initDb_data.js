import getPool from "./getPool.js";

const initDb_data = async () => {
  try {
    const pool = await getPool();

    console.log("Conexión establecida.");
    console.log("Poblando tabla 'users'...");

    await pool.query(`
                INSERT INTO users (name, email, password, active, personal_info)
                VALUES
                ("user01_test123", "juanmaciasperez89@gmail.com", "$2b$10$81b3IBiTE3ISeyEBbCHwp.whmEzZkKN1pLuLarbyFzY7wMAHfoMxK", 1, "dasdasdds"),
                ("user02_test321", "jj69cost@gmail.com", "$2b$10$0WfVbW07bLFPwmt/qL7qQ.lNz9U5xadAoAw5sj5eQpNZ8E9bggCUK", 1, "dasdasdds"),
                ("user03_123test", "user03@test.com", "$2b$10$ghy3imG2g0Ms06E0jtUNG.W6X2fevVl86lnRTMZ2DoIQyGaXME7pW", 1, "dasdasdds"),
                ("user04_321test", "user04@test.com", "$2b$10$2oSdypiBYIPuGrfuY7/4lu9bHmU4umgzOZqOykHP2bE9Y/t9CcJOy", 1, "dasdasdds"),
                ("user05_user123", "user05@test.com", "$2b$10$9vm4fUJwr6P0DUjbW.ASSOxDRYZSEGaHpx1as/WbA78tsuc3KkHPW", 1, "dasdasdds"),
                ("user06_user321", "user06@test.com", "$2b$10$nK1Ewz.JqL1ZpLqukArhMOpxN1up9CFscb48DzyaWiM6zyaEKHlsO", 1, "dasdasdds"),
                ("user07_123user", "user07@test.com", "$2b$10$GYdtxP8HgK0..hQXJYGjZe4ca7M8VdLuF2n2gGNsrJVGhVlCYoFGu", 1, "dasdasdds"),
                ("user08_321user", "user08@test.com", "$2b$10$cCBrRBxWoH4/txgcHxtWf.II07mAAl/ZcH1eTDaWs2LD5rtg2iRcS", 1, "dasdasdds"),
                ("user09_pass123", "user09@test.com", "$2b$10$caWQ36hFqdWmOlKvUPxkzeLyAx0aA26UDD6HUFmHXcnhbqdXOGF.e", 1, "dasdasdds"),
                ("user10_pass321", "user10@test.com", "$2b$10$LjitD6YxmKy.MzqB/zVehePco3GGxAh7h9Ack2vXAcfKSvRAxr/ce", 1, "dasdasdds")
            `);

    console.log("Tabla 'users' poblada correctamente.");
    console.log("Poblando tabla 'events'...");

    await pool.query(`
                INSERT INTO events (technology, online_on_site, city, start_date, finish_date, category, name, description)
                VALUES
                ("Python", "on_site", "A Coruña", "2024-05-22", "2024-06-22", "Coding Race", "Python Race Hackathon", "esta es la descripcion del evento 1"),
                ("JavaScript", "on_site", "A Coruña", "2024-08-13", "2024-10-13", "Gaming with JavaScript", "JSGaming", "esta es la descripcion del evento 2"),
                ("React", "on_site", "Madrid", "2024-07-24", "2024-09-24", "Top Developers", "Selecting best React developers", "esta es la descripcion del evento 3"),
                ("Next", "on_site", "Barcelona", "2024-02-05", "2024-04-05", "Coding Race", "App development Race with Next", "esta es la descripcion del evento 4"),
                ("Python", "on_site", "Madrid", "2024-01-17", "2024-03-28", "Coding", "Python AI development", "esta es la descripcion del evento 5"),
                ("JavaScript", "on_site", "Barcelona", "2024-06-08", "2024-09-08", "Coding Race", "API development with JS Race", "esta es la descripcion del evento 6"),
                ("Python", "on_site", "Sevilla", "2024-01-15", "2024-03-15", "Python Masters", "Advanced Python Techniques", "esta es la descripcion del evento 7"),
                ("JavaScript", "on_site", "Valencia", "2024-02-20", "2024-04-20", "JavaScript Summit", "Exploring JS Frameworks", "esta es la descripcion del evento 8"),
                ("React", "on_site", "Bilbao", "2024-01-05", "2024-02-25", "React Bootcamp", "Intensive React Training", "esta es la descripcion del evento 9"),
                ("Next", "on_site", "Alicante", "2024-03-10", "2024-05-10", "Next.js Conference", "Building Modern Apps with Next.js", "esta es la descripcion del evento 10"),
                ("Python", "on_site", "Granada", "2024-04-18", "2024-06-18", "Python for AI", "Machine Learning with Python", "esta es la descripcion del evento 11")
            `);

    console.log("Tabla 'events' poblada correctamente.");
    console.log("Poblando tabla 'participates'...");

    await pool.query(`
                INSERT INTO participates (user_id, event_id, reservation_code, user_rating, rating_user_event)
                VALUES
                (1, 1, NULL, 100, 5),
                (3, 1, NULL, 80, 4),
                (5, 1, NULL, 60, 3),
                (7, 1, NULL, 40, 2),
                (9, 1, NULL, 20, 1),
                (2, 2, NULL, 80, 3),
                (4, 2, NULL, 60, 5),
                (6, 2, NULL, 100, 4),
                (8, 2, NULL, 40, 1),
                (10, 2, NULL, 20, 2),
                (1, 3, NULL, 20, 3),
                (2, 3, NULL, 40, 4),
                (5, 3, NULL, 80, 5),
                (6, 3, NULL, 100, 2),
                (8, 3, NULL, 60, 1),
                (3, 4, "testCode", 20, 1),
                (4, 4, NULL, 100, 3),
                (7, 4, NULL, 60, 5),
                (9, 4, NULL, 40, 2),
                (10, 4, NULL, 80, 4),
                (3, 5, NULL, 40, 5),
                (7, 5, NULL, 100, 4),
                (4, 5, NULL, 80, 1),
                (8, 5, NULL, 20, 3),
                (10, 5, NULL, 60, 2),
                (2, 6, NULL, 100, 5),
                (1, 6, NULL, 20, 1),
                (5, 6, NULL, 60, 3),
                (8, 6, NULL, 40, 2),
                (9, 6, NULL, 80, 4),
                (1, 7, NULL, 100, 5),
                (3, 7, NULL, 80, 4),
                (5, 7, NULL, 60, 3),
                (7, 7, NULL, 40, 2),
                (9, 7, NULL, 20, 1),
                (2, 8, NULL, 80, 3),
                (4, 8, NULL, 60, 5),
                (6, 8, NULL, 100, 4),
                (8, 8, NULL, 40, 1),
                (10, 8, NULL, 20, 2),
                (1, 9, NULL, 20, 3),
                (2, 9, NULL, 40, 4),
                (5, 9, NULL, 80, 5),
                (6, 9, NULL, 100, 2),
                (8, 9, NULL, 60, 1),
                (3, 10, "testCode", 20, 1),
                (4, 10, NULL, 100, 3),
                (7, 10, NULL, 60, 5),
                (9, 10, NULL, 40, 2),
                (10, 10, NULL, 80, 4),
                (3, 11, NULL, 40, 5),
                (7, 11, NULL, 100, 4),
                (4, 11, NULL, 80, 1),
                (8, 11, NULL, 20, 3),
                (10, 11, NULL, 60, 2)
                `);

    console.log("Tabla 'participates' poblada correctamente.");
    console.log("Poblando tabla 'teams'...");

    await pool.query(`
                INSERT INTO teams (name, description)
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

    console.log("Tabla 'teams' poblada correctamente.");
    console.log("Poblando tabla 'member_of'...");

    await pool.query(`
                INSERT INTO member_of (user_id, team_id, event_id)
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

    console.log("Tabla 'member_of' poblada correctamente.");
    console.log("Cerrando la conexión.");

    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

initDb_data();
