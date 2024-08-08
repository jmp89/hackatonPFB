import getPool from './getPool.js';

const initDb_data = async () => {
    try {
        const pool = await getPool();

        console.log('Conexión establecida.');
        console.log("Poblando tabla 'users'...");

        await pool.query(`
                INSERT INTO users (name, surname, username, email, password, active, personal_info, avatar)
                VALUES
                ("Juan", "Macias Pérez", "juanmacias", "juanmaciasperez89@gmail.com", "$2b$10$81b3IBiTE3ISeyEBbCHwp.whmEzZkKN1pLuLarbyFzY7wMAHfoMxK", 1, "Hola, soy Juan Macias, un desarrollador web apasionado por la programación en Python. Me encanta trabajar en proyectos innovadores y aprender nuevas tecnologías.", "/uploads/avatar_01.png"),
                ("José", "García Costas", "jose_garcia", "jj69cost@gmail.com", "$2b$10$0WfVbW07bLFPwmt/qL7qQ.lNz9U5xadAoAw5sj5eQpNZ8E9bggCUK", 1, "Soy José García, un entusiasta de JavaScript y el desarrollo de juegos. Siempre estoy buscando nuevos desafíos y oportunidades para crecer en mi carrera profesional.", "/uploads/avatar_02.png"),
                ("Pedro", "López Martínez", "pedro_lopez", "user03@test.com", "$2b$10$ghy3imG2g0Ms06E0jtUNG.W6X2fevVl86lnRTMZ2DoIQyGaXME7pW", 1, "Hola, soy Pedro López. Me especializo en el desarrollo de aplicaciones web con React y disfruto trabajando en proyectos colaborativos. Siempre estoy dispuesto a enfrentar nuevos retos.", "/uploads/avatar_03.png"),
                ("María", "Sánchez Rodríguez", "maria_sanchez", "user04@test.com", "$2b$10$2oSdypiBYIPuGrfuY7/4lu9bHmU4umgzOZqOykHP2bE9Y/t9CcJOy", 1, "Soy María Sánchez. Mi pasión es el desarrollo de aplicaciones con tecnologías emergentes como Next.js. Me encanta aprender y compartir mis conocimientos con la comunidad.", "/uploads/avatar_04.png"),
                ("Ana", "González Fernández", "ana_gonzalez", "user05@test.com", "$2b$10$9vm4fUJwr6P0DUjbW.ASSOxDRYZSEGaHpx1as/WbA78tsuc3KkHPW", 1, "Hola, soy Ana González. Trabajo en el desarrollo de soluciones de inteligencia artificial con Python. Me gusta colaborar en proyectos desafiantes y explorar nuevas áreas en el campo de la IA.", "/uploads/avatar_05.png"),
                ("Miguel", "Torres Gómez", "miguel_torres", "user06@test.com", "$2b$10$nK1Ewz.JqL1ZpLqukArhMOpxN1up9CFscb48DzyaWiM6zyaEKHlsO", 1, "Hola, soy Miguel Torres. Especializado en el desarrollo de APIs con JavaScript. Me gusta crear soluciones eficientes y colaborar en equipos para alcanzar objetivos comunes.", "/uploads/avatar_06.png"),
                ("Laura", "Díaz Muñoz", "laura_diaz", "user07@test.com", "$2b$10$GYdtxP8HgK0..hQXJYGjZe4ca7M8VdLuF2n2gGNsrJVGhVlCYoFGu", 1, "Soy Laura Díaz. Mi foco está en el desarrollo de aplicaciones móviles y web, y siempre estoy en busca de nuevos desafíos para mejorar mis habilidades y conocimientos.", "/uploads/avatar_07.png"),
                ("Luis", "Ruiz Romero", "luis_ruiz", "user08@test.com", "$2b$10$cCBrRBxWoH4/txgcHxtWf.II07mAAl/ZcH1eTDaWs2LD5rtg2iRcS", 1, "Hola, soy Luis Ruiz. Trabajo en el campo del desarrollo de software y me especializo en el diseño y desarrollo de aplicaciones web. Me apasiona la programación y los retos técnicos.", "/uploads/avatar_08.png"),
                ("Carmen", "Hernández Jiménez", "carmen_hernandez", "user09@test.com", "$2b$10$caWQ36hFqdWmOlKvUPxkzeLyAx0aA26UDD6HUFmHXcnhbqdXOGF.e", 1, "Hola, soy Carmen Hernández. Me dedico al desarrollo de proyectos en JavaScript y tengo una fuerte pasión por el aprendizaje continuo y la innovación en tecnología.", "/uploads/avatar_09.png"),
                ("Alberto", "Moreno Pérez", "alberto_moreno", "user10@test.com", "$2b$10$LjitD6YxmKy.MzqB/zVehePco3GGxAh7h9Ack2vXAcfKSvRAxr/ce", 1, "Hola, soy Alberto Moreno. Me especializo en el desarrollo de aplicaciones modernas con Next.js y me gusta colaborar con otros desarrolladores para crear soluciones innovadoras.", "/uploads/avatar_01.png"),
                ("Carlos", "Martínez López", "c.martinez_01", "carlos.martinez@test.com", "$2b$10$8KfJ9ZT4fW2Vz7rO3Z/KnOCJZpQDb6RRkKXN6CAtJlgIULoI6k1bC", 1, "Hola, soy Carlos Martínez, un desarrollador web con experiencia en PHP y MySQL. Me encanta resolver problemas complejos y estoy siempre dispuesto a aprender nuevas tecnologías.", "/uploads/avatar_01.png"),
    ("Isabel", "Rodríguez Álvarez", "isabel.rodriguez_22", "isabel.rodriguez@test.com", "$2b$10$7fLjs8nB4vsRHLdA9/JjFf0dU9hX2Q9H5Q3mDoV05fZ09/DYQ5jqm", 1, "Soy Isabel Rodríguez, apasionada por el desarrollo front-end con React y Vue.js. Disfruto creando interfaces de usuario intuitivas y estéticamente agradables.", "/uploads/avatar_02.png"),
    ("Javier", "Fernández Ruiz", "javi_fernandez_r", "javier.fernandez@test.com", "$2b$10$v0D1EkTQ9r97f6Nzi7oGHe9JK5E03RCwZLeT0JFrJkcy1dqkSczQy", 1, "Hola, soy Javier Fernández. Me especializo en el desarrollo de aplicaciones móviles usando Flutter y Android. Me gusta enfrentar desafíos y mejorar mis habilidades constantemente.", "/uploads/avatar_03.png"),
    ("Lucía", "Gómez Martínez", "lucia.gomez_99", "lucia.gomez@test.com", "$2b$10$U0FJkA7HqN3r54y2ZSW8ZOpW7xlPiIHZh6FjZnFPQxuTXFqJ0dF2K", 1, "Soy Lucía Gómez, experta en el desarrollo de aplicaciones web con Angular y Node.js. Me apasiona trabajar en proyectos innovadores y colaborar con otros profesionales.", "/uploads/avatar_04.png"),
    ("Alejandro", "Sánchez Morales", "ale.sanchez_m", "alejandro.sanchez@test.com", "$2b$10$HZ8ksC5lN1L5J9xgPz9oz.4uUolLtp0yKlx14mZlA3O5js.4G7D6y", 1, "Hola, soy Alejandro Sánchez. Mi especialidad es el desarrollo de soluciones en inteligencia artificial con Python. Disfruto trabajando en proyectos complejos y desafiantes.", "/uploads/avatar_05.png"),
    ("Marta", "Vázquez Pérez", "marta_vazquez_77", "marta.vazquez@test.com", "$2b$10$DmcU1yF0x3EN8HsHneX7He.5F2G1GHhf/2o41nY0Gd64yRy2LRlmO", 1, "Hola, soy Marta Vázquez. Me dedico al desarrollo de APIs con JavaScript y Node.js. Me encanta crear soluciones eficientes y colaborar con equipos para lograr nuestros objetivos.", "/uploads/avatar_06.png"),
    ("Sergio", "Hernández Ruiz", "sergio_hernandez_88", "sergio.hernandez@test.com", "$2b$10$kF1zN2RbsS36l1o7dsd8OugMl5Mhxzx5lGy6yO3i1FRy3M8efaeq6", 1, "Hola, soy Sergio Hernández. Mi enfoque está en el desarrollo de aplicaciones móviles con React Native. Estoy siempre en busca de nuevos desafíos para seguir creciendo profesionalmente.", "/uploads/avatar_07.png"),
    ("Elena", "Pérez Martínez", "elena.perez_05", "elena.perez@test.com", "$2b$10$IVRMe8zkGJ3j5Pc6zVojHukmZlz.DI8d6i5F8NN3LgVDwF5LO1ZZq", 1, "Hola, soy Elena Pérez. Trabajo en el diseño y desarrollo de aplicaciones web y disfruto aprender y aplicar nuevas tecnologías en proyectos innovadores.", "/uploads/avatar_08.png"),
    ("Raúl", "Jiménez Ortega", "raul_jimenez_34", "raul.jimenez@test.com", "$2b$10$7WyNeLIS/rY4Q4aFsD3JXeOr94e6a/zxPxKcnrrHf4q7aqZjBRbTO", 1, "Hola, soy Raúl Jiménez. Me especializo en el desarrollo con JavaScript y TypeScript, y me apasiona trabajar en proyectos que desafían mis habilidades técnicas.", "/uploads/avatar_09.png"),
    ("Ana", "Morales Sánchez", "ana.morales_12", "ana.morales@test.com", "$2b$10$eHsW/QV2AQppIjkP4RXq6uG.CiQoRoBOVu5E6Uwm6wV2ndXysq5aG", 1, "Hola, soy Ana Morales. Me especializo en el desarrollo con Next.js y disfruto colaborando con otros desarrolladores para crear aplicaciones modernas y eficientes.", "/uploads/avatar_01.png")
            `);

        console.log("Tabla 'users' poblada correctamente.");
        console.log("Poblando tabla 'events'...");

        await pool.query(`
        INSERT INTO events (name, online_on_site, location, start_date, finish_date, start_time, finish_time, description, image, organizer)
        VALUES
        ("Global Python Hackathon", "online", "http://example.com", "2024-05-22", "2024-06-22", "09:00:00", "18:00:00", "Participa en el Global Python Hackathon y resuelve retos apasionantes utilizando Python. Conéctate desde cualquier parte del mundo y colabora con desarrolladores para crear soluciones innovadoras. ¡No te lo pierdas!", "/uploads/event1.jpg", 2),
        ("JavaScript Gaming Challenge", "on_site", "A Coruña", "2024-08-13", "2024-10-13", "10:00:00", "17:00:00", "Únete a nuestro JavaScript Gaming Challenge en A Coruña y demuestra tus habilidades desarrollando juegos impresionantes con JavaScript. Colabora, compite y aprende de los mejores desarrolladores del sector.", "/uploads/event2.jpg", 3),
        ("React Dev Contest", "online", "http://example.es", "2024-07-24", "2024-09-24", "09:30:00", "18:30:00", "En el React Dev Contest, seleccionamos a los mejores desarrolladores de React. Participa en línea, resuelve desafíos y muestra tus habilidades en el desarrollo de aplicaciones con React. ¡Inscríbete ahora!", "/uploads/event3.jpg", 4),
        ("Next.js App Hackathon", "on_site", "Barcelona", "2024-02-05", "2024-04-05", "08:00:00", "16:00:00", "Participe en el Next.js App Hackathon en Barcelona y compita en el desarrollo de aplicaciones innovadoras usando Next.js. Conozca a otros desarrolladores, colabore en proyectos y gane premios increíbles.", "/uploads/event4.jpg", 5),
        ("AI Python Sprint", "on_site", "Madrid", "2024-01-17", "2024-03-28", "09:15:00", "17:15:00", "Participa en el AI Python Sprint en Madrid y muestra tus habilidades en el desarrollo de soluciones de inteligencia artificial con Python. Colabora con expertos y compite por el primer lugar en esta emocionante carrera.", "/uploads/event1.jpg", 6),
        ("JavaScript API Challenge", "on_site", "Barcelona", "2024-06-08", "2024-09-08", "09:00:00", "18:00:00", "Únete al JavaScript API Challenge en Barcelona y demuestra tus habilidades creando APIs robustas y eficientes con JavaScript. Trabaja en equipo, aprende y compite por premios y reconocimiento.", "/uploads/event5.jpg", 7),
        ("Advanced Python Marathon", "on_site", "Sevilla", "2024-01-15", "2024-03-15", "10:00:00", "17:00:00", "Participa en el Advanced Python Marathon en Sevilla y lleva tus habilidades en Python al siguiente nivel. Resuelve desafíos avanzados, colabora con otros desarrolladores y aprende nuevas técnicas.", "/uploads/event3.jpg", 8),
        ("JS Frameworks Exploration Hackathon", "on_site", "Valencia", "2024-02-20", "2024-04-20", "08:30:00", "17:30:00", "Explora y domina diferentes frameworks de JavaScript en nuestro JS Frameworks Exploration Hackathon en Valencia. Participa en retos interesantes y aprende de los mejores expertos en el campo.", "/uploads/event4.jpg", 5),
        ("React Intensive Hackathon", "online", "http://example.net", "2024-01-05", "2024-02-25", "09:00:00", "18:00:00", "Únete al React Intensive Hackathon y mejora tus habilidades en React. Participa desde cualquier lugar, colabora con otros desarrolladores y resuelve desafíos intensivos para ganar grandes premios.", "/uploads/event5.jpg", 9),
        ("Next.js Modern Apps Hackathon", "on_site", "Alicante", "2024-03-10", "2024-05-10", "09:30:00", "18:30:00", "Desarrolla aplicaciones modernas con Next.js en el Next.js Modern Apps Hackathon en Alicante. Conéctate con otros desarrolladores, comparte ideas y gana premios por tus innovadoras soluciones.", "/uploads/event1.jpg", 3),
        ("Machine Learning Python Hackathon", "on_site", "Granada", "2024-04-18", "2024-06-18", "09:00:00", "18:00:00", "Participa en el Machine Learning Python Hackathon en Granada y demuestra tus habilidades en el desarrollo de modelos de aprendizaje automático con Python. Colabora con otros expertos y compite por premios.", "/uploads/event2.jpg", 6),
        ("Global Python Summit", "online", "http://example.com", "2024-11-01", "2024-12-01", "09:00:00", "18:00:00", "Únete al Global Python Summit y muestra tus habilidades en Python. Participa desde cualquier lugar y colabora con desarrolladores para crear soluciones innovadoras.", "/uploads/event1.jpg", 2),
        ("JavaScript Game Showdown", "on_site", "A Coruña", "2025-01-13", "2025-02-13", "10:00:00", "17:00:00", "Compite en el JavaScript Game Showdown en A Coruña y demuestra tus habilidades creando juegos impresionantes con JavaScript. Aprende de los mejores y compite por premios.", "/uploads/event2.jpg", 3),
        ("React Native Challenge", "online", "http://example.es", "2025-02-01", "2025-03-01", "09:30:00", "18:30:00", "Participa en el React Native Challenge, resuelve desafíos y muestra tus habilidades en el desarrollo de aplicaciones móviles con React Native. ¡Inscríbete ahora!", "/uploads/event3.jpg", 4),
        ("Next.js Innovation Sprint", "on_site", "Barcelona", "2024-12-05", "2025-01-05", "08:00:00", "16:00:00", "Participe en el Next.js Innovation Sprint en Barcelona y compita en el desarrollo de aplicaciones innovadoras usando Next.js. Conozca a otros desarrolladores, colabore en proyectos y gane premios increíbles.", "/uploads/event4.jpg", 5),
        ("AI Python Hackfest", "on_site", "Madrid", "2025-03-17", "2025-04-28", "09:15:00", "17:15:00", "Participa en el AI Python Hackfest en Madrid y muestra tus habilidades en el desarrollo de soluciones de inteligencia artificial con Python. Colabora con expertos y compite por el primer lugar en esta emocionante carrera.", "/uploads/event1.jpg", 6),
        ("JavaScript API Mastery", "on_site", "Barcelona", "2025-04-08", "2025-05-08", "09:00:00", "18:00:00", "Únete al JavaScript API Mastery en Barcelona y demuestra tus habilidades creando APIs robustas y eficientes con JavaScript. Trabaja en equipo, aprende y compite por premios y reconocimiento.", "/uploads/event5.jpg", 7),
        ("Advanced Python Coding Marathon", "on_site", "Sevilla", "2025-01-15", "2025-02-15", "10:00:00", "17:00:00", "Participa en el Advanced Python Coding Marathon en Sevilla y lleva tus habilidades en Python al siguiente nivel. Resuelve desafíos avanzados, colabora con otros desarrolladores y aprende nuevas técnicas.", "/uploads/event3.jpg", 8),
        ("JS Frameworks Hackathon", "on_site", "Valencia", "2025-02-20", "2025-03-20", "08:30:00", "17:30:00", "Explora y domina diferentes frameworks de JavaScript en nuestro JS Frameworks Hackathon en Valencia. Participa en retos interesantes y aprende de los mejores expertos en el campo.", "/uploads/event4.jpg", 5),
        ("React Coding Challenge", "online", "http://example.net", "2025-01-05", "2025-02-25", "09:00:00", "18:00:00", "Únete al React Coding Challenge y mejora tus habilidades en React. Participa desde cualquier lugar, colabora con otros desarrolladores y resuelve desafíos intensivos para ganar grandes premios.", "/uploads/event5.jpg", 9),
        ("Next.js App Developer Meetup", "on_site", "Alicante", "2025-03-10", "2025-05-10", "09:30:00", "18:30:00", "Desarrolla aplicaciones modernas con Next.js en el Next.js App Developer Meetup en Alicante. Conéctate con otros desarrolladores, comparte ideas y gana premios por tus innovadoras soluciones.", "/uploads/event1.jpg", 3),
        ("Machine Learning Python Competition", "on_site", "Granada", "2025-04-18", "2025-05-18", "09:00:00", "18:00:00", "Participa en el Machine Learning Python Competition en Granada y demuestra tus habilidades en el desarrollo de modelos de aprendizaje automático con Python. Colabora con otros expertos y compite por premios.", "/uploads/event2.jpg", 6)
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
                (1, 17),
                (1, 18),
                (1, 22),
                (1, 27),
                (2, 2),
                (2, 5),
                (2, 3),
                (2, 12),
                (2, 31),
                (3, 3),
                (3, 13),
                (3, 27),
                (3, 24),
                (3, 29),
                (4, 4),
                (4, 13),
                (4, 29),
                (4, 22),
                (4, 24),
                (5, 1),
                (5, 20),
                (5, 21),
                (5, 18),
                (5, 27),
                (6, 2),
                (6, 5),
                (6, 30),
                (6, 28),
                (6, 22),
                (7, 1),
                (7, 17),
                (7, 18),
                (7, 27),
                (7, 22),
                (8, 2),
                (8, 3),
                (8, 15),
                (8, 16),
                (8, 12),
                (9, 3),
                (9, 13),
                (9, 29),
                (9, 22),
                (9, 24),
                (10, 4),
                (10, 13),
                (10, 29),
                (10, 22),
                (10, 23),
                (11, 1),
                (11, 20),
                (11, 21),
                (11, 18),
                (11, 24),
                (12, 1),
                (12, 17),
                (12, 24),
                (13, 2),
                (13, 3),
                (13, 5),
                (14, 3),
                (14, 15),
                (14, 16),
                (15, 4),
                (15, 5),
                (15, 12),
                (16, 1),
                (16, 21),
                (16, 22),
                (17, 2),
                (17, 28),
                (17, 30),
                (18, 1),
                (18, 22),
                (18, 27),
                (19, 3),
                (19, 4),
                (19, 5),
                (20, 4),
                (20, 22),
                (20, 23),
                (21, 1),
                (21, 18),
                (21, 24),
                (22, 1),
                (22, 20),
                (22, 21)
            `);

        console.log("Tabla 'technologies_events' poblada correctamente.");

        console.log("Poblando tabla 'thematics_events'...");

        await pool.query(`
                INSERT INTO thematics_events ( event_id, thematic_id )
                VALUES
                (1, 1),
                (1, 3),
                (2, 14),
                (2, 8),
                (3, 2),
                (3, 8),
                (4, 8),
                (4, 9),
                (5, 3),
                (5, 6),
                (6, 4),
                (6, 8),
                (7, 1),
                (7, 3),
                (8, 8),
                (8, 2),
                (9, 8),
                (9, 6),
                (10, 9),
                (10, 8),
                (11, 3),
                (11, 6),
                (12, 1),
                (12, 5),
                (13, 8),
                (13, 14),
                (14, 2),
                (14, 8),
                (15, 8),
                (15, 9),
                (16, 3),
                (16, 5),
                (17, 4),
                (17, 8),
                (18, 6),
                (18, 5),
                (19, 8),
                (19, 2),
                (20, 9),
                (20, 8),
                (21, 3),
                (21, 6),
                (22, 5),
                (22, 3)
            `)

        console.log("Tabla 'thematics_events' poblada correctamente.");

        console.log('Cerrando la conexión.');

        process.exit(0);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

initDb_data();
