const shortid = require('shortid');
const URL = require('../models/url');

async function createShortUrl(req, res) {
  try {
    const body = req.body;
    console.log("req.body:", body);

    if (!body.url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Check if URL already exists
    const existingUrl = await URL.findOne({ redirectUrl: body.url });
    
    if (existingUrl) {
      // Return existing short ID
      return res.status(200).json({ id: existingUrl.shortId, redirectUrl: existingUrl.redirectUrl });
    }

    // Create new short URL if it doesn't exist
    const shortID = shortid.generate ? shortid.generate() : shortid();
    const newUrl = await URL.create({
      shortId: shortID,
      redirectUrl: body.url,
      visithistory: []
    });

    return res.status(201).json({ id: shortID, redirectUrl: newUrl.redirectUrl });
  } catch (err) {
    console.error('createShortUrl error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function handleRedirecturl(req,res){
    try {
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
    
}
module.exports = { createShortUrl ,handleRedirecturl};
