const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerjsDoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const joi = require('joi');

const bookRoutes = require('./bookRoutes/bookRoute');
const authRoutes = require('./bookRoutes/authRoute');


// mongoose.connect('mongodb://localhost/bookDB', 
//     { useNewUrlParser: true, useUnifiedTopology: true }
// )
//    .then(() => console.log('Connected to MongoDB'))
//    .catch(err => console.error(err));

// const bookSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     author: { type: String, required: true },
//     genre: { type: String, required: true },
//     published: { type: Date, required: true },
//     description: { type: String },
//     ratings_count: { type: Number, default: 0 },
//     reviews_count: { type: Number, default: 0 },
// });

app.use('/book', bookRoutes);
app.use('/auth', authRoutes);

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
    apis: ['./bookRoutes/.js'],
};

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerjsDoc(options)));



port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});