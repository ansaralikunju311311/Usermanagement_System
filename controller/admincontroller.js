
const adminmodel = require('../model/adminmodel');
const bcrypt = require('bcrypt'); // bcrypt required
const usermodel = require('../model/usermodel');
const saltround = 10;

const loadlogin = async (req, res) => {
    res.render('admin/login');
};

const login = async (req, res) => {
    
    try {
        const { email, password } = req.body;
    
        const admin = await adminmodel.findOne({ email });
        

        if (!admin) {
            return res.render('admin/login', { message: 'Invalid password or email' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.render('admin/login', { message: 'Invalid password' });
        }

        req.session.admin = true; // Fixed session assignment
        res.redirect('/admin/dashboard'); 
    } catch (err) {
        console.log(err);
        res.send('!error  something went wrong')
    }
};

const loaddashboard = async (req, res) => {
    try {
        const admin = req.session.admin;
        if (!admin) {
            return res.redirect('/admin/login'); 
        }

        const users = await usermodel.find({}); 
        res.render('admin/dashboard', { users });
    } catch (err) {
        console.log(err); 
        res.send('!something went wrong')
    }
};
const editUser=async (req,res)=>{
    try
    {
        const {email,password,id}=req.body;
        const hashedpassword=await bcrypt.hash(password,10)
        const user=await usermodel.findOneAndUpdate({_id:id},
            {$set:{email,password:hashedpassword}}
        )
        res.redirect('/admin/dashboard')
        // console.log(user);
        // res.json(user);
    }
    catch(error){
        console.log(error);
    }
}

const deleteUser=async (req,res)=>{
    try{
        const {id}=req.params;
        const user= await usermodel.findOneAndDelete({_id:id});
        res.redirect('/admin/dashboard')

    }
    catch(error){
        console.log(error);
    }

}

const addUser= async (req,res)=>{
    try{
        const {email,password}= req.body;
        const hashedpassword= await bcrypt.hash(password,10);

        const newUser=new usermodel({
            email,
            password:hashedpassword
        })
        await newUser.save();
        res.redirect('/admin/dashboard')

    }
    catch(error){
        console.log(error);
    }
}
const logout= async(req,res)=>{
    req.session.admin=null;
    res.redirect('/admin/login');
}
module.exports = {
    loadlogin,
    login,
    loaddashboard,
    editUser,
    deleteUser,
    addUser,
    logout
};
