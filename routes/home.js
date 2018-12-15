
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Home Page', 
                        message: 'Welcome to Express World!'});
});

module.exports = router;
