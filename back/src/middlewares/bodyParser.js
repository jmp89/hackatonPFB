// Middleware para parsear JSON
export const jsonParser = (req, res, next) => {
    if (req.headers['content-type'] === 'application/json') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            try {
                req.body = JSON.parse(data);
            } catch (err) {
                return res.status(400).send('Invalid JSON');
            }
            next();
        });
    } else {
        next();
    }
};
