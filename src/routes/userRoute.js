const express = require("express");
const { usersignup } = require("../controllers/userController");
const router = express.Router()

router.post('/',usersignup);

module.exports  = router