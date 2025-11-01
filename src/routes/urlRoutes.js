const express = require('express');

const router = express.Router();
const {createShortUrl,handleRedirecturl, getAnalytics} = require('../controllers/urlController');

router.post('/', createShortUrl);

// router.get('/:shortId', handleRedirecturl);
// router.get('/analytics/:shortId',getAnalytics)

module.exports = router;