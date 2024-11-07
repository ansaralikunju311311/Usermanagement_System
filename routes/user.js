const express=require('express');
const userRoutes=express.Router();
const usercontroller=require('../controller/usercontroller')
const usermiddleware=require('../middleware/session')


userRoutes.get('/login',usermiddleware.islogin,usercontroller.loadlogin);
userRoutes.post('/login',usermiddleware.islogin,usercontroller.loginuser);
userRoutes.get('/register',usermiddleware.islogin,usercontroller.loadregister);
userRoutes.post('/register',usercontroller.registeruser);
userRoutes.get('/home',usermiddleware.checksession,usercontroller.loadhome);
userRoutes.get('/logout',usermiddleware.checksession,usercontroller.logout);
module.exports=userRoutes;