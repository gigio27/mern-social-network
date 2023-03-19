const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }))
app.use(morgan('dev'));

// routes
app.use('/api/user', userRoutes);



// server 
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

