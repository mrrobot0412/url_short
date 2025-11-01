const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const urlSchema = new mongoose.Schema({

  
    shortId:{type:String,required:true,unique:true},
     // unique for every url to avoid duplicates
    redirectUrl:{type:String,required:true} ,
    visithistory:[{timestamp:{type:Number}}],

},

    {timestamps:true}
);

const URL = mongoose.model('url',urlSchema);
module.exports = URL;