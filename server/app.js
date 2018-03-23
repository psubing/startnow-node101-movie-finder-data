const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const omdb = 'http://www.omdbapi.com'
const api = '&apikey=8730e0e';
const x = {}
const app = express();

app.use(morgan('dev'));

app.get('/', function (req, res) {
    if (x[req.originalUrl] === undefined) {
    axios.get(omdb + req.originalUrl + api)
        .then(function (request, response) {
            x[req.originalUrl] = request.data;
            res.send(res.json(x[req.originalUrl]));
        })
    }else{
        res.json(x[req.originalUrl]);
    }
});

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;