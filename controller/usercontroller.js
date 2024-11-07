const userschema=require('../model/usermodel');
const bcrypt=require('bcrypt');
const saltround=10;

// register user authentcation

const registeruser=async (req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(req.body);


        const user=await userschema.findOne({email})

        if(user){
            return res.render('user/register',{message:'user already exists'})
        }

        //bcryptingg

        const hashed=await bcrypt.hash(password,saltround)

        const newUser=new userschema({
            email,
            password:hashed
        })
    await newUser.save();
    res.render('user/login',{message:'Registered succesfully'})
    
    }catch(error){
        res.render('user/register',{message:'something went wrong'})

    
        
    }
}

// login user authentication

const loginuser=async (req,res)=>{
    try{
        const {email,password}=req.body;
        
        const user=await userschema.findOne({email})
        if(!user){
            return res.render('user/login',{message:'User not exists'})
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.render('user/login',{message:'Incorrect password'})
        }
        
        req.session.user=true;
   
        
       
        res.redirect('/user/home');


    }
    catch(error){
        res.render('user/login',{message:'something went wrong'})

    }
}
const loadlogin=(req,res)=>{
    res.render('user/login')
}
const loadregister=(req,res)=>{
    res.render('user/register')
}
const loadhome=(req,res)=>{
    const email = req.session.user.email;
    console.log(email)
    res.render('user/home',{email})
} 
const logout = (req, res) => {
    req.session.user = null; 
    res.render('user/login', { message: 'Logged out successfully' }); 
};

//exporting it to routes/user
module.exports={registeruser,
    loginuser,
    loadregister,
    loadlogin,
    loadhome,
    logout
};