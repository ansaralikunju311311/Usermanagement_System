const express=require('express');
const app=express();
const userRoutes=require('./routes/user');
const adminRouter=require('./routes/admin');
const path=require('path'); 
const connectDB=require('./Database/connectdb');
const session=require('express-session');
const nocache=require('nocache');
const hbs = require('hbs')


app.use(nocache());

app.use(session({
  secret: 'your-secret-key', // change this to a random string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60000 } // maxAge is in milliseconds
}));


//setting up view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
hbs.registerHelper('add', function(value, increment) {
  return value + increment;
});
app.use(express.static('public'));

//setting up the middleware for converting the data we get
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req,res,next)=>{
  console.log(req.url);
  next()
})
connectDB();

app.use('/user',userRoutes);
app.use('/admin',adminRouter)

app.listen(3009,()=>{
    console.log('server running succesfully');
});