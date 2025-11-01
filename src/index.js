const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');
require('dotenv').config();
const {connecttodb } = require('../connect');

const app = express();
const PORT = 9000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Start server after database connection





// POST route for creating short URLs
app.use('/url', urlRoutes);

// GET route for redirecting short URLs - must be last to avoid catching other routes
app.get('/:shortId', async (req, res) => {
  try {
    const URL = require('./models/url');
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    
    if (!entry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    
    entry.visithistory.push({ timestamp: Date.now() });
    await entry.save();
    
    return res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error('Redirect error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Connect to database and start server
async function startServer() {
  try {
    await connecttodb("mongodb://localhost:27017/shorturl");
    
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();