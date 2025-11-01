const express = require('express');

const router = express.Router();
const {createShortUrl} = require('../controllers/urlController');

router.post('/', createShortUrl);
// router.get('/original/:shortUrl', urlController.getOriginalUrl);

module.exports = router;