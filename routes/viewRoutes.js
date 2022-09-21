const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getDashboard);

router.get('/overview', viewController.getOverview);

router.get('/tour/:slug', viewController.getTour);

module.exports = router;
