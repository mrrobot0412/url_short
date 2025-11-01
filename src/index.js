const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');
require('dotenv').config();
const {connecttodb } = require('../connect');
const {URL }=require('./models/url');
const { createShortUrl,handleRedirecturl,getAnalytics } = require('./controllers/urlController');
const app = express();
const PORT = 9000
connecttodb("mongodb://localhost:27017/shorturl").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/url', urlRoutes);

app.get('/test',(req,res)=>{
  return res.end("<h1>Hello World</h1>")
})
app.get('/:shortId',handleRedirecturl) 
app.get('/analytics/:shortId',getAnalytics)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
}); 