import getPool from "../../database/getPool.js";


const createEventAdminController = async (req, res) => {
    const pool = await getPool();
    const { usuarios, equipos, proyectos, participaciones } = req.body;
  
    try {
     
      await pool.query('Inicializacion');
  
      // Insertar datos en la tabla usuarios
      for (let usuario of usuarios) {
        const { nombre, email, contraseña, es_admin } = usuario;
        await pool.query(
          'INSERT INTO usuarios (nombre, email, contraseña, es_admin) VALUES (?, ?, ?, ?)',
          [nombre, email, contraseña, es_admin]
        );
      }
  
      // Insertar datos en la tabla equipos
      for (let equipo of equipos) {
        const { nombre, descripcion } = equipo;
        await pool.query(
          'INSERT INTO equipos (nombre, descripcion) VALUES (?, ?)',
          [nombre, descripcion]
        );
      }
  
      // Insertar datos en la tabla proyectos
      for (let proyecto of proyectos) {
        const { nombre, descripcion, equipo_id } = proyecto;
        await pool.query(
          'INSERT INTO proyectos (nombre, descripcion, equipo_id) VALUES (?, ?, ?)',
          [nombre, descripcion, equipo_id]
        );
      }
  
      // Insertar datos en la tabla participaciones
      for (let participacion of participaciones) {
        const { usuario_id, equipo_id } = participacion;
        await pool.query(
          'INSERT INTO participaciones (usuario_id, equipo_id) VALUES (?, ?)',
          [usuario_id, equipo_id]
        );
      }
  
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