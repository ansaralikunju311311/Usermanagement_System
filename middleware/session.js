const checksession=(req,res,next)=>{
    
    if(req.session.user){
        next()
    }
    else{
        res.redirect('/user/login')
    }

}

const islogin=(req,res,next)=>{
    if(req.session.user){
        
        res.redirect('/user/home');
    }
    else{
        next()
    }
}

module.exports={checksession,islogin}