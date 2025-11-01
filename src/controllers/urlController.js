const shortid = require('shortid');
const URL = require('../models/url');


async function createShortUrl(req, res) {
  try {
    const body = req.body;
    console.log("req.body:", body);

    if (!body.url) {
      return res.status(400).json({ error: "URL is required" });
    }


    const existingUrl = await URL.findOne({ redirectUrl: body.url });
    
    if (existingUrl) {

      return res.render('home', {
        id: existingUrl.shortId
      });
    }


    const shortID = shortid(8)
    const newUrl = await URL.create({
      shortId: shortID,
      redirectUrl: body.url,
      visithistory: []
    });

    res.render('home',{
      id:shortID
    })
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

async function getAnalytics(req,res){
  const shortId=req.params.shortId;
  const result=await URL.findOne({shortId});
  return res.json({totalClicks:result.visithistory.length,analytics:result.visithistory});
}


module.exports = { createShortUrl ,handleRedirecturl,getAnalytics};
