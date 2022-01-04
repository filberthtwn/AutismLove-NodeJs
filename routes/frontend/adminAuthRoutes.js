const express = require('express');
const viewsController = require('../../controllers/viewsController');
const router = express.Router();

router
    .route('/')
    .get(viewsController.getLogin)
    .post(viewsController.login);

module.exports = router;
