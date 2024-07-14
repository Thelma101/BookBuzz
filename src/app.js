const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const joi = require('joi');

const bookRoutes = require('./bookRoutes/bookRoute');
const authRoutes = require('./bookRoutes/authRoute');
app.use('/book', bookRoutes);
app.use('/auth', authRoutes);

// Database
 mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error(err));

      
//    Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerjsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Book Buzz API',
            version: '1.0.0',
            description: 'A simple Express API for managing books',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
    },
    apis: ['./bookRoutes/*.js'],
};

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerjsDoc(options)));



port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});