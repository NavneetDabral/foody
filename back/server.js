var express=require('express');
var cors=require('cors');
var multer=require('multer');
var mongoose=require('mongoose');
var sha1=require('sha1');
var catSchema=require('./schema/addcat');
var foodSchema=require('./schema/addfood');
var userSchema=require('./schema/regis');
var addRestSchema=require('./schema/addRe');
var bodyParser=require('body-parser');
var app=express();
app.use(cors());
app.use(bodyParser.json());
var connection = mongoose.connect('mongodb://localhost/foodpanda', { useMongoClient: true });
//multer for file upload
app.use(express.static('../admin'));
 var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            fn=file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
            cb(null,fn);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');
//api for login
app.post("/login",function(req,res)
{
   em=req.body.email;
   pass=sha1(req.body.pass);
   userSchema.find({email:em,password:pass},function(err,data)
   {
       if(err)
       {
          console.log("error");
           return res.json({err:1,msg:'email or pass is not correct'});
       }
       if (data.length === 0)
        {
            console.log("User not found");
            return res.json({ err: 1, msg: 'email or pass is not correct' });
        }
         console.log("hhh");
   return res.json({err:0,msg:em,rol:data[0].role});
   
   })
})
//registration API
app.post("/regis",function(req,res)
{
    var data={fname:req.body.fnn,lname:req.body.lnn,email:req.body.emaill,password:sha1(req.body.passs)};
    var regis=new userSchema(data);
    regis.save(function(err,data)
    {
        if(err)
        {
            res.json({err:1,msg:'Registration Error'})
        }
        //here problem comes we need to send that status it is important and if we send 2 responses then app will crash so i am going to
        //print that successfull message in app.js
        //res.json({err:0,msg:'Registered Succusfully'})
        res.sendStatus(200);
        console.log("Success");
    })
})
//Add restaurants
app.post("/addrest",function(req,res)
{
    //var data={Restaurant_Name:req.body.Rnn,Address:req.body.Add,description:req.body.description,email:req.body.emaill,Phone:req.body.phone};
    console.log("hi"+req.body.image);
    var rest=new addRestSchema(req.body);
    rest.save(function(err,data)
    {
        if(err)
        {  
            console.log("error");
            res.json({err:1,msg:'Registration Error'})
        }
        //here problem comes we need to send that status it is important and if we send 2 responses then app will crash so i am going to
        //print that successfull message in app.js
        //res.json({err:0,msg:'Registered Succusfully'})
        res.sendStatus(200);
        console.log("Success");
    })
})
//add category Images
app.post("/addcatimage",function(req,res)
{
upload(req,res,function(err){
    //req will give all the details of image
    //see by console.log(req)
   console.log(req)
    //console.log(req.file.path)
    //path=req.file.path;
    res.json({path:req.file.filename})
            if(err){
                
                console("error")
            }
})
  
    })
//add Food Images
app.post("/addfoodimage",function(req,res)
{
upload(req,res,function(err){
    //req will give all the details of image
    //see by console.log(req)
   console.log(req)
    //console.log(req.file.path)
    //path=req.file.path;
    res.json({path:req.file.filename})
            if(err){
                
                console("error")
            }
})
  
    })
//add restaurant images
app.post("/addrestimage",function(req,res)
{
upload(req,res,function(err){
    //req will give all the details of image
    //see by console.log(req)
   console.log(req)
    //console.log(req.file.path)
    //path=req.file.path;
    res.json({path:req.file.filename})
            if(err){
                
                console("error")
            }
        })
  
    })
app.post("/addcat",function(req,res)
{              
   var cat=new catSchema(req.body);
   console.log("run");
   cat.save(function(err,data)
   {
       if(err)
       {
           res.json({msg:err})
       }
       res.sendStatus(200);
        console.log("Success");
    
   })
})
//Add food
app.post("/addfood",function(req,res)
{
    //var data={cuisine:req.body.cuname,category:req.body.catname,restaurant:req.body.restname,price:req.body.price};
    var rest=new foodSchema(req.body);
    rest.save(function(err,data)
    {
        if(err)
        {  
            console.log("error");
            res.json({err:1,msg:'Registration Error'})
        }
        //here problem comes we need to send that status it is important and if we send 2 responses then app will crash so i am going to
        //print that successfull message in app.js
        //res.json({err:0,msg:'Registered Succusfully'})
        res.sendStatus(200);
        console.log("Success");
    })
})
//FETCH RESTAURANTS
app.get('/fetch_rest',function(req,res)
{
    addRestSchema.find({},function(err,data)
    {
        if(err)
        {
             return res.json({error:1,data:"Error"})
        }
        if(data.length===0)
        {
             return res.json({error:1,data:"No Data Found"})
        }
        return res.json({error:0,data:data})
    })
})
//FETCH CATEGORIES IN MAIN PAGE
app.get('/fetch_category',function(req,res)
{
    catSchema.find({},function(err,data)
    {
        if(err)
        {
             return res.json({error:1,data:"Error"})
        }
        if(data.length===0)
        {
             return res.json({error:1,data:"No Data Found"})
        }
        return res.json({error:0,data:data})
    })
})
//FETCH CATEGORIES IN ADMIN ADD FOOD PAGE
app.get('/fetch_cat',function(req,res)
{      
    catSchema.find({},function(err,data)
    {
        if(err)
        {
             return res.json({error:1,data:"Error"})
        }
        if(data.length===0)
        {
             return res.json({error:1,data:"No Data Found"})
        }
        return res.json({error:0,data:data})
    })
})
//FETCH CATEGORIES IN REST PAGE
app.get("/category/:restname",function(req,res)
{
      dat=req.params.restname;
      catSchema.find({restname:dat},function(err,data)
      {
          if(err)
          {
              return res.json({error:1,data:"Error"})
          }
          if(data.length===0)
          {
              return res.json({error:1,data:"No Data Found"})
          }
          return res.json({error:0,data:data})
      })
})
    //FETCH FOOD BASED ON CATEGORY AND RESTAURANT
    app.get("/getfood",function(req,res)
{     
    dat=req.param('paramOne');  
    re=req.param('paramTwo');
    //check everything is all right
      console.log("hi i am server")
      console.log(dat)
      console.log(re)
      //search database
      foodSchema.find({category:dat,restaurant:re},function(err,data)
      {
          if(err)
          {
              return res.json({error:1,data:"Error"})
          }
          if(data.length===0)
          {
              return res.json({error:1,data:"No Data Found"})
          }
          return res.json({error:0,data:data})
      })
})
    //Searching
    app.get("/searchfood/:cu/:res",function(req,res)
{     
    //check everything is all right
      console.log("hi i am server")
      console.log(req.params.cu)
      //search database
      foodSchema.find({cuisine:req.params.cu,restaurant:req.params.res},function(err,data)
      {
          if(err)
          {
              return res.json({error:1,data:"Error"})
          }
          if(data.length===0)
          {
              return res.json({error:1,data:"No Data Found"})
          }
          return res.json({error:0,data:data})
      })
})

app.listen(8086,function()
{
    console.log("Server running on 8086")
})
