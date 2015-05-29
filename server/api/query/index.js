'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./query.controller');

router.get('/:query', controller.query);

module.exports = router;
