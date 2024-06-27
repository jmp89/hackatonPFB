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

// Middleware para parsear datos URL-encoded
export const urlencodedParser = (req, res, next) => {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            req.body = data.split('&').reduce((acc, pair) => {
                const [key, value] = pair.split('=');
                acc[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
                return acc;
            }, {});
            next();
        });
    } else {
        next();
    }
};
