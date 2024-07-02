import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtener el directorio actual (__dirname) usando import.meta.url y fileURLToPath
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadFiles = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      const err = new Error("Faltan campos");
      err.httpStatus = 400;
      throw err;
    }

    const file = req.files.archive;

    // Directorio de destino donde guardar los archivos subidos (back/uploads)
    // sin /public no funciona, pero no debería incluirlo
    const uploadDir = path.join(__dirname, "../../public/uploads");

    // Verificar si la carpeta de destino existe, si no, crearla
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Ruta completa del archivo de destino dentro de back/uploads
    const uploadPath = path.join(uploadDir, file.name);

    // Mover el archivo a la carpeta de destino
    await file.mv(uploadPath);

    res.send({
      status: "ok",
      message: "Archivo subido",
    });
  } catch (err) {
    console.error(err);
    res.status(err.httpStatus || 500).send({
      status: "error",
      message: err.message,
    });
  }
};

export default uploadFiles;
