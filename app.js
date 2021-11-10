const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

//Routes
const movieRoutes  = require('./routes/movie');
const commentRoutes = require('./routes/comment');
const characterRoutes = require('./routes/character');

app.use(bodyParser.json()); // application/json
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Content-Length, Accept, X-Requested-With, XMLHttpRequest');
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else{
        next();
    }
});

// Routes which should handle requests
app.use('/movies', movieRoutes);
app.use('/comments', commentRoutes);
app.use('/characters', characterRoutes);

mongoose.connect('mongodb+srv://Star-Admin:Admin.123@cluster2.0fekd.mongodb.net/star-wars')
.then(result => {
    app.listen(8080);
})
.catch(err => {
    console.log(err);
});
