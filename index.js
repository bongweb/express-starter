const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:root');
const coursesRoute = require('./routes/courses');
const homeRoute = require('./routes/home');

const app = express();
debug({APP_Name: config.get('name')});
debug({pass: config.get('db.password')});
//  db connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/personal-storage',  {useNewUrlParser: true })
        .then(() => debug('connected to DB'))
        .catch((err) => debug(err.message));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', coursesRoute);
app.use('/', homeRoute);

app.set('view engine', 'pug');
app.set('views', './views');


if (app.get('env') === 'development') app.use(morgan('tiny'));



const port = process.env.PORT || 3000

app.listen(port, () => {
    debug(`app is running on ${port}`);
})

