const express = require('express');
const viewsController = require('../../controllers/viewsController');

const router = express.Router();

router.use(viewsController.protect);

router.get('/', viewsController.getDashboard);
router.get('/logout', viewsController.logout);

module.exports = router;
