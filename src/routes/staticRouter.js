const express = require("express")
const router  = express.Router()

router.get('/',(req,res)=>{
    return res.render('home')
})
router.get('/signup',(req,res)=>{
    res.render('signup')
})

module.exports=router