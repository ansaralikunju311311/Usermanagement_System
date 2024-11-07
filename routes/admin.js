const express=require('express');
const adminRouter=express.Router();
const admincontroller=require('../controller/admincontroller');
const adminmiddleware=require('../middleware/adminsession')

adminRouter.get('/login',adminmiddleware.islogin,admincontroller.loadlogin);
adminRouter.post('/login',admincontroller.login);
adminRouter.get('/dashboard',adminmiddleware.checksession,admincontroller.loaddashboard);
adminRouter.post('/edit-user',adminmiddleware.checksession,admincontroller.editUser);
adminRouter.get('/delete-user/:id',adminmiddleware.checksession,admincontroller.deleteUser);
adminRouter.post('/add-user',adminmiddleware.checksession,admincontroller.addUser);
adminRouter.get('/logout',adminmiddleware.checksession,admincontroller.logout);


module.exports=adminRouter;