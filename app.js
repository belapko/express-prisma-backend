const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json()); // Этой и строкой ниже позваоляем принимать запросы с body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const userRoutes = require('./routes/users');
const homeworkRoutes = require('./routes/homework')
app.use('/api/user', userRoutes);
app.use('/api/homework', homeworkRoutes);

module.exports = app;
