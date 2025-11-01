const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();


const urlRoutes = require('./routes/urlRoutes');
const userRoutes = require('./routes/userRoute')
const staticRouter = require('./routes/staticRouter')

const { createShortUrl,handleRedirecturl,getAnalytics } = require('./controllers/urlController');
const app = express();
const path= require("path")
const {connecttodb } = require('../connect');
const URL =require('./models/url');

const PORT = 9000
connecttodb("mongodb://localhost:27017/shorturl").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views',path.resolve('./views'))
app.use('/url', urlRoutes);
app.use('/',staticRouter)
app.use('/user',userRoutes)
// app.get('/test',async(req,res)=>{

//   const allurl = await URL.find({})
//   return res.render('home'
//     ,{
//       urls:allurl
//     }
//   );

//   return res.end("<h1>Hello World</h1>")
// })
app.get('/url/:shortId',handleRedirecturl) 
app.get('/analytics/:shortId',getAnalytics)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
}); 