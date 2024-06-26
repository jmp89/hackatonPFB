const gestionError = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || "Fallo en el servidor",
      status: status,
    },
  });
};

//* Asi es como lo hicimos en clase, como es un poco mas simplón
//* lo pongo para que decidais cual preferís, el de arriba es de
//* estar investigando en internet y era el que más solía aparecer
// const gestionError = (message, status) => {
//   const error = new Error(message);
//   error.httpStatus = status;
//   return error;
// };

export default gestionError;
