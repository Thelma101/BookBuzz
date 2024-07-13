// authentication
app.use(express.json());
const jwt = require('jsonwebtoken');
const { secret } = require('./config');

app.use((req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.status(403).send('Invalid token');
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});