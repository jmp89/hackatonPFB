import getPool from './getPool.js';

const initDb_data = async () => {
    try {
        const pool = await getPool();

        console.log('Conexión establecida.');
        console.log("Poblando tabla 'users'...");

        await pool.query(`
                INSERT INTO users (name, surname, username, email, password, active, personal_info, avatar)
                VALUES
                ("Juan", "Macias Pérez", "user01_test123", "juanmaciasperez89@gmail.com", "$2b$10$81b3IBiTE3ISeyEBbCHwp.whmEzZkKN1pLuLarbyFzY7wMAHfoMxK", 1, "dasdasdds", "/uploads/avatar_01.png"),
                ("José", "García Costas", "user02_test321", "jj69cost@gmail.com", "$2b$10$0WfVbW07bLFPwmt/qL7qQ.lNz9U5xadAoAw5sj5eQpNZ8E9bggCUK", 1, "dasdasdds", "/uploads/avatar_02.png"),
                ("Pedro", "López Martínez", "user03_123test", "user03@test.com", "$2b$10$ghy3imG2g0Ms06E0jtUNG.W6X2fevVl86lnRTMZ2DoIQyGaXME7pW", 1, "dasdasdds", "/uploads/avatar_03.png"),
                ("María", "Sánchez Rodríguez", "user04_321test", "user04@test.com", "$2b$10$2oSdypiBYIPuGrfuY7/4lu9bHmU4umgzOZqOykHP2bE9Y/t9CcJOy", 1, "dasdasdds", "/uploads/avatar_04.png"),
                ("Ana", "González Fernández", "user05_user123", "user05@test.com", "$2b$10$9vm4fUJwr6P0DUjbW.ASSOxDRYZSEGaHpx1as/WbA78tsuc3KkHPW", 1, "dasdasdds", "/uploads/avatar_05.png"),
                ("Miguel", "Torres Gómez", "user06_user321", "user06@test.com", "$2b$10$nK1Ewz.JqL1ZpLqukArhMOpxN1up9CFscb48DzyaWiM6zyaEKHlsO", 1, "dasdasdds", "/uploads/avatar_06.png"),
                ("Laura", "Díaz Muñoz", "user07_123user", "user07@test.com", "$2b$10$GYdtxP8HgK0..hQXJYGjZe4ca7M8VdLuF2n2gGNsrJVGhVlCYoFGu", 1, "dasdasdds", "/uploads/avatar_07.png"),
                ("Luis", "Ruiz Romero", "user08_321user", "user08@test.com", "$2b$10$cCBrRBxWoH4/txgcHxtWf.II07mAAl/ZcH1eTDaWs2LD5rtg2iRcS", 1, "dasdasdds", "/uploads/avatar_08.png"),
                ("Carmen", "Hernández Jiménez", "user09_pass123", "user09@test.com", "$2b$10$caWQ36hFqdWmOlKvUPxkzeLyAx0aA26UDD6HUFmHXcnhbqdXOGF.e", 1, "dasdasdds", "/uploads/avatar_09.png"),
                ("Alberto", "Moreno Pérez", "user10_pass321", "user10@test.com", "$2b$10$LjitD6YxmKy.MzqB/zVehePco3GGxAh7h9Ack2vXAcfKSvRAxr/ce", 1, "dasdasdds", "/uploads/avatar_01.png")
            `);

        console.log("Tabla 'users' poblada correctamente.");
        console.log("Poblando tabla 'events'...");

        await pool.query(`
        INSERT INTO events (id, name, online_on_site, location, start_date, finish_date, start_time, finish_time, description, image, organizer)
        VALUES
        (1, "Python Race Hackathon", "online", "http://example.com", "2024-05-22", "2024-06-22", "09:00:00", "18:00:00", "Esta es la descripción del evento 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer ac libero sit amet libero pretium varius sit amet eget sem. Suspendisse potenti. Fusce aliquet magna et magna ultricies, ac ultrices lacus feugiat. Praesent aliquam, mauris non ultricies condimentum, elit turpis posuere lacus, ut imperdiet orci metus vitae lectus. Maecenas ut convallis erat, a pretium lacus. In et aliquet odio. Cras nec ante purus. Pellentesque malesuada libero nec turpis pellentesque auctor. Duis aliquet sem sit amet varius tincidunt.", "/uploads/event1.jpg", 2),
        (2, "JSGaming", "on_site", "A Coruña", "2024-08-13", "2024-10-13", "10:00:00", "17:00:00", "Esta es la descripción del evento 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.", "/uploads/event2.jpg", 3),
        (3, "Selecting best React developers", "online", "http://example.es", "2024-07-24", "2024-09-24", "09:30:00", "18:30:00", "Esta es la descripción del evento 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.", "/uploads/event3.jpg", 4),
        (4, "App development Race with Next", "on_site", "Barcelona", "2024-02-05", "2024-04-05", "08:00:00", "16:00:00", "Esta es la descripción del evento 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus sed augue semper porta. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi.", "/uploads/event4.jpg", 5),
        (5, "Python AI development", "on_site", "Madrid", "2024-01-17", "2024-03-28", "09:15:00", "17:15:00", "Esta es la descripción del evento 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis.", "/uploads/event1.jpg", 6),
        (6, "API development with JS Race", "on_site", "Barcelona", "2024-06-08", "2024-09-08", "09:00:00", "18:00:00", "Esta es la descripción del evento 6. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis.", "/uploads/event5.jpg", 7),
        (7, "Advanced Python Techniques", "on_site", "Sevilla", "2024-01-15", "2024-03-15", "10:00:00", "17:00:00", "Esta es la descripción del evento 7. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi.", "/uploads/event3.jpg", 8),
        (8, "Exploring JS Frameworks", "on_site", "Valencia", "2024-02-20", "2024-04-20", "08:30:00", "17:30:00", "Esta es la descripción del evento 8. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.", "/uploads/event4.jpg", 5),
        (9, "Intensive React Training", "online", "http://example.net", "2024-01-05", "2024-02-25", "09:00:00", "18:00:00", "Esta es la descripción del evento 9. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.", "/uploads/event5.jpg",9),
        (10, "Building Modern Apps with Next.js", "on_site", "Alicante", "2024-03-10", "2024-05-10", "09:30:00", "18:30:00", "Esta es la descripción del evento 10. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.", "/uploads/event1.jpg", 3),
        (11, "Machine Learning with Python", "on_site", "Granada", "2024-04-18", "2024-06-18", "09:00:00", "18:00:00", "Esta es la descripción del evento 11. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "/uploads/event2.jpg", 6)
    `);
    
        

        console.log("Tabla 'events' poblada correctamente.");
        console.log("Poblando tabla 'participates'...");

        await pool.query(`
                INSERT INTO participates (user_id, event_id, reservation_code, user_score, rating_user_event)
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

        console.log("Poblando tabla 'technologies'...");

        await pool.query(`
                INSERT INTO technologies ( name )
                VALUES
                ("Python"),
                ("JavaScript"),
                ("React"),
                ("NextJS"),
                ("NodeJS"),
                ("Java"),
                ("C#"),
                ("Ruby"),
                ("PHP"),
                ("Swift"),
                ("Kotlin"),
                ("HTML/CSS"),
                ("TypeScript"),
                ("Angular"),
                ("VueJS"),
                ("Flutter"),
                ("Django"),
                ("Flask"),
                ("Spring Boot"),
                ("TensorFlow"),
                ("PyTorch"),
                ("Docker"),
                ("Kubernetes"),
                ("AWS"),
                ("Azure"),
                ("Google Cloud"),
                ("PostgreSQL"),
                ("MySQL"),
                ("MongoDB"),
                ("GraphQL"),
                ("Solidity"),
                ("Rust")
            `);

        console.log("Tabla 'technologies' poblada correctamente.");

        console.log("Poblando tabla 'thematics'...");

        await pool.query(`
                INSERT INTO thematics ( name )
                VALUES
                ("Coding Race"),
                ("Top Developers"),
                ("AI Development"),
                ("API Development"),
                ("Machine Learning"),
                ("Data Science"),
                ("Cybersecurity"),
                ("Web Development"),
                ("Mobile App Development"),
                ("Blockchain"),
                ("Cloud Computing"),
                ("IoT"),
                ("Robotics"),
                ("Game Development"),
                ("Gaming"),
                ("Healthcare Technology")
            `);

        console.log("Tabla 'thematics' poblada correctamente.");

        console.log("Poblando tabla 'technologies_events'...");

        await pool.query(`
                INSERT INTO technologies_events ( event_id, technology_id )
                VALUES
                (1, 1),
                (2, 2),
                (3, 3),
                (4, 4),
                (5, 5),
                (6, 6),
                (7, 7),
                (8, 8),
                (9, 9),
                (10, 10),
                (11, 11),
                (2, 4),
                (4, 6),
                (6, 8),
                (8, 10),
                (3, 1),
                (5, 3),
                (7, 9),
                (9, 15)
            `);

        console.log("Tabla 'technologies_events' poblada correctamente.");

        console.log("Poblando tabla 'thematics_events'...");

        await pool.query(`
                INSERT INTO thematics_events ( event_id, thematic_id )
                VALUES
                (1, 1),
                (2, 2),
                (3, 3),
                (4, 4),
                (5, 5),
                (6, 6),
                (7, 7),
                (8, 8),
                (9, 9),
                (10, 10),
                (11, 11)
            `)

        console.log("Tabla 'thematics_events' poblada correctamente.")

        console.log('Cerrando la conexión.');

        process.exit(0);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

initDb_data();
