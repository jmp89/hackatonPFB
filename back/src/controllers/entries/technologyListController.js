import getPool from "../../database/getPool.js";

// Función asincrónica para listar tecnologías
const listTechnologies = async (req, res) => {
  try {
    let pool = await getPool();

    // Consulta SQL para obtener las tecnologías distintas
    const query = `
      SELECT DISTINCT tecnologia
      FROM eventos;
    `;

    // Ejecutar la consulta y obtener los resultados
    const [rows, fields] = await pool.query(query);

    // Extraer las tecnologías de los resultados
    const tecnologias = rows.map(row => row.tecnologia);

    res.json(tecnologias);
  } catch (error) {
    console.error('Error al obtener las tecnologías:', error);
    res.status(500).json({ error: 'Error al obtener las tecnologías' });
  }
};

export default listTechnologies;
