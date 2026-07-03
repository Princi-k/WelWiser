const express = require('express');
const { registerUser,getUsers,loginUser,logoutUser,updateUser } = require('../controllers/user.controller');
const {validateLogin,validateRegister} = require('../middlewares/validator.middleware');
const { authUser } = require('../middlewares/auth.middleware');

const router = express.Router();


router.get('/allusers',getUsers);

router.post('/register',validateRegister,registerUser);

router.post('/userlogin',validateLogin,loginUser);

router.post('/logoutuser',logoutUser);

router.put('/update',authUser,updateUser);

module.exports = router;