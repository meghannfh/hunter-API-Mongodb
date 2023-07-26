const express = require('express')
const router = express.Router();
const huntersController = require('../controllers/hunters');

router.get('/hunters', huntersController.getHunters);

router.get('/:hunterName', huntersController.getHunter);

module.exports = router;