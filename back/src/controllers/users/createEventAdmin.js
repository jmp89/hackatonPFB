import getPool from "../../database/getPool.js";

const createEventAdminController = async (req, res) => {
    const pool = await getPool();
 
  try {
    // Iniciar una transacción
    await pool.query('Inicializar');

    // Insertar datos en la tabla usuarios
      await pool.query(
        'INSERT INTO usuarios (nombre, email, contraseña, es_admin) VALUES (?, ?, ?, ?)',
        [nombre, email, contraseña, es_admin]
      );
    

    // Insertar datos en la tabla equipos
  
      await pool.query(
        'INSERT INTO equipos (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion]
      );
    

    // Insertar datos en la tabla proyectos
    
      await pool.query(
        'INSERT INTO proyectos (nombre, descripcion, equipo_id) VALUES (?, ?, ?)',
        [nombre, descripcion, equipo_id]
      );
    

    // Insertar datos en la tabla participaciones
    
      await pool.query(
        'INSERT INTO participaciones (usuario_id, equipo_id) VALUES (?, ?)',
        [usuario_id, equipo_id]
      );
    

    // Confirmar la transacción
    await pool.query('COMMIT');
    res.status(201).json({ message: 'Datos insertados correctamente' });

  } catch (error) {
    // Revertir la transacción en caso de error
    await pool.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Error al insertar datos', error });
  } finally {
    // Liberar la conexión
    pool.releaseConnection(pool.connection);
  }
};

export default createEventAdminController;