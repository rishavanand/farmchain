var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/blocks', controllers.blockchain.getBlocks);
router.post('/transactions', controllers.blockchain.addTransaction);
router.get('/mine', controllers.blockchain.mine);
router.get('/reset', controllers.blockchain.reset);

module.exports = router;