const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const joi = require('joi');
const swaggerDocs = require('./bookRoutes/swaggerDocs.json');
const swaggerUI = require('swagger-ui-express');
  require('dotenv').config();


  //   Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

  // Routes
const bookRoutes = require('./bookRoutes/bookRoute');
const authRoutes = require('./bookRoutes/authRoute');

app.use('/', bookRoutes);
app.use('/', authRoutes);

// Database
 mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error(err));


port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});