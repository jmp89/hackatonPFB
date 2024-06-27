import getPool from '../database/getPool.js';


const authAdmin = async (req, res, next) => {
    const userId = req.userId;  // Asumiendo que userId está presente en req
  
    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
  
    const pool = await getPool();
  
    try {
      const [rows] = await pool.query('SELECT es_admin FROM usuarios WHERE id = ?', [userId]);
  
      if (rows.length === 0 || !rows[0].es_admin) {
        return res.status(403).json({ message: 'Acceso denegado: solo los administradores pueden realizar esta acción' });
      }
  
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error de servidor', error });
    }
  };
  
  export default authAdmin;