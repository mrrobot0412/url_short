const User = require('../models/user')
async function usersignup(req,res)
{

    const {email , name ,password }= req.body
    await User.create
   ( {
        name,
        email , 
        password
    } );
    return res.render('home')
}
module.exports = {usersignup}