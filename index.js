const express = require('express');
const routes = require('./routes/index');
const mongoose = require('./config/mongoose');
const passport  =  require('./config/passport-jwt-strategy');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

app.use(passport.initialize());


app.use('/', routes);


app.listen(8001, (err) => {
    if(err){
        console.log('Server is not running', err )

        return;
    }
    console.log('Server is running', )
});