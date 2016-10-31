'use strict';

var router = require('express').Router();

router.use('/wishes', require('./wish-api'));

router.use('/stars', require('./star-api'));

module.exports = router;

