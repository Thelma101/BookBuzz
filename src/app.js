const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerjsDoc = require('swagger-jsdoc');

app.use('/', bookRoutes);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Book API',
            version: '1.0.0',
            description: 'A simple Express API for managing books',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/bookRoutes.js'],
};

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerjsDoc(options)));



port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});