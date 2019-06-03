var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';
var request = require('request-promise');
module.exports = (function(app){

  app.get('/', function(req,res){
    // request('http://localhost:5000')
    // .then(function (htmlString) {
        // Process html...
        // console.log(htmlString)
        res.render('a');
    // })
    // .catch(function (err) {
        // Crawling failed...
    // });
    
  });

  app.get('/register',function(req,res){
    res.render('register');
  });

  app.get('/login',function(req,res){
    res.render('unified');
  });

 app.post('/api2',urlencodedParser,async function(req,res){
  var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:5000/ ',
        json: true // Automatically stringifies the body to JSON
    };
    
    var returndata;
    var sendrequest = await request(options)
    .then(function (parsedBody) {
        console.log(parsedBody); // parsedBody contains the data sent back from the Flask server
        returndata = parsedBody; // do something with this data, here I'm assigning it to a variable.
    })
    .catch(function (err) {
        console.log(err);
    });
    
    // res.send(returndata);
   res.render('api2',{data:returndata})
});

 app.post('/api3',urlencodedParser,function(req,res){
   res.render('api3')
});


// Login TO DB==================================================================
  app.post('/demo',urlencodedParser,function(req,res){
   MongoClient.connect(url, function(err, db) {
   db.collection('userprofile').findOne({ name: req.body.name}, function(err, user) {
             if(user ===null){
               res.end("Login invalid");
            }else if (user.name === req.body.name && user.pass === req.body.pass){
              console.log(user)
              console.log(user.courses[1])
            res.render('unified',{profileData:user});

          } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
          }
   });
 });
});

app.post('/api3',urlencodedParser,async function(req,res){

  res.render('api3')
})

app.post('/api4',urlencodedParser,async function(req,res){

  res.render('api4')
})
//register to DB================================================================
app.post('/regiterToDb',urlencodedParser,async function(req,res){
  console.log(req.body)
 var obj = JSON.stringify(req.body);
 var jsonObj = JSON.parse(obj);
 MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var u=req.body.userid
  var c;
  switch(u){
  // var c=new Array("HarvardX/CB22x/2013_Spring","HarvardX/CS50x/2012","HarvardX/ER22x/2013_Spring ","HarvardX/PH207x/2012_Fall","HarvardX/PH278x/2013_Spring","MITx/14.73x/2013_Spring","MITx/2.01x/2013_Spring","MITx/3.091x/2012_Fall","MITx/3.091x/2013_Spring","MITx/6.002x/2012_Fall ","MITx/6.002x/2013_Spring","MITx/6.00x/2012_Fall");
  case "MHxPC130597674":c = new Array(
    {name:"HarvardX/CB22x/2013_Spring",title:"The Ancient Greek Hero"},
    {name:"HarvardX/CS50x/2012",title:"Introduction to Computer Science (2016) "},
    {name:"MITx/3.091x/2012_Fall",title:"Introduction to Solid State Chemistry "},
    {name:"MITx/6.00x/2012_Fall ",title:"Introduction to Computer Science and Programming"}
    );
    break;

  case "MHxPC130597670":c = new Array(
      {name:"MITx/3.091x/2012_Fall",title:"Introduction to Solid State Chemistry"},
      {name:"HarvardX/PH207x/2012_Fall",title:"Health in Numbers: Quantitative Methods in Clinical and Public Health Research "},
      {name:"HarvardX/PH278x/2013_Spring",title:"Human Health and Global Environmental Change"},
      {name:"MITx/6.002x/2012_Fall",title:"Circuits and Electronics"}
    );
    break;


  case "MHxPC130597667":c = new Array(
      {name:"HarvardX/CS50x/2012",title:"Introduction to Computer Science "},
      {name:"HarvardX/ER22x/2013_Spring",title:"Justice"},
      {name:"HarvardX/PH207x/2012_Fall",title:"Health in Numbers: Quantitative Methods in Clinical and Public Health Research "},
      {name:"MITx/8.02x/2013_Spring",title:"Electricity and Magnetism"}
    );
    break;

case "MHxPC130597665":c = new Array(
      {name:"HarvardX/PH207x/2012_Fall",title:"Health in Numbers: Quantitative Methods in Clinical and Public Health Research"},
      {name:"MITx/6.002x/2012_Fall",title:"Circuits and Electronics "},
      {name:"MITx/14.73x/2013_Spring",title:"Challenges of World Poverty "},
      {name:"MITx/2.01x/2013_Spring",title:"Elements of Structures "}
    );
    break;

case "MHxPC130000011":c = new Array(
      {name:"HarvardX/CB22x/2013_Spring",title:"The Ancient Greek Hero "},
      {name:"HarvardX/ER22x/2013_Spring",title:"Justice "},
      {name:"HarvardX/PH207x/2012_Fall",title:"Health in Numbers: Quantitative Methods in Clinical and Public Health Research" },
      {name:"MITx/6.002x/2012_Fall ",title:"Circuits and Electronics  "}
    );
    break;

  default:c = new Array(
    {name:"MITx/6.002x/2012_Fall",title:"Circuits and Electronics"},
      {name:"MITx/3.091x/2012_Fall",title:"Introduction to Solid State Chemistry"},
      {name:"HarvardX/PH207x/2012_Fall",title:"Health in Numbers: Quantitative Methods in Clinical and Public Health Research "},
      {name:"HarvardX/PH278x/2013_Spring",title:"Human Health and Global Environmental Change"}
    );
  }
  var myobj = { 
    name: req.body.name, 
    pass: req.body.pass, 
    email:req.body.email,
    institution:req.body.institution,
    gender:req.body.gender,
    participants:req.body.participants,
    courses:c,
    userid:req.body.userid
  };
  console.log("Myobj\n\n",myobj)
  dbo.collection("userprofile").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
        

});
     res.render('a')

  });
//register profile to MongoDB================================================================
  app.post('/completeprofile',urlencodedParser,function(req,res){
   var obj = JSON.stringify(req.body);
   console.log("Final reg Data : "+obj);
   var jsonObj = JSON.parse(obj);
      MongoClient.connect(url, function(err, db) {
      db.collection("userprofile").insertOne(jsonObj, function(err, res) {
     if (err) throw err;
     console.log("1 document inserted");
     db.close();
      });
       res.render('completeprofile',{profileData:req.body});
      });
    });

app.get('/input',urlencodedParser,function(req,res){
  res.render('input')
})

app.get('/input1',urlencodedParser,function(req,res){
  res.render('input1')
})




app.post('/certify',urlencodedParser,async function(req,res){
  console.log(req.body)
  var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:5000/certificate?nevents='+req.body.nevents+'&&ndays='+req.body.ndays+'&&nchapters='+req.body.nchapters+'&&nforums='+req.body.nforums,
        json: true // Automatically stringifies the body to JSON
    };
    
    var returndata;
    var sendrequest = await request(options)
    .then(function (parsedBody) {
        console.log(parsedBody); // parsedBody contains the data sent back from the Flask server
        returndata = parsedBody; // do something with this data, here I'm assigning it to a variable.
    })
    .catch(function (err) {
        console.log(err);
    });
    
    // res.send(returndata);

      certified=returndata.certify.substring(1,2),
      droupout=returndata.droupout,
    
    console.log(certified)
    if(certified=='1'){
      res.send("Congratulations, based on our prediction you will be CERTIFIED")
    }else{
    res.send("SORRY, based on our prediction you will NOT BE CERTIFIED")
  }
})


app.post('/p',urlencodedParser, function(req,res){
  MongoClient.connect(url,  function(err, db) {
    console.log("Request:\n",req.body)
         db.collection('userprofile').findOne({ name: req.body.name}, function(err, user) {
    users=user
             if(user ===null){
               res.end("Login invalid");
            }else if (user.name === req.body.name && user.pass === req.body.pass){
             console.log("retrieved user data!\n")

            res.render('profile',{loginData:user});
            

          } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
          }
   });
   });
    
  });





app.post('/dropouts',urlencodedParser,async function(req,res){
  console.log(req.body)
  var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:5000/droupoutPredict?institution='+req.body.institution+'&&participants='+req.body.participants+'&&hrs='+req.body.hrs+'&&male='+req.body.male+'&&female='+req.body.female+'&&audited='+req.body.audited+'&&title='+req.body.title,
        json: true // Automatically stringifies the body to JSON
    };
    
    var returndata;
    var sendrequest = await request(options)
    .then(function (parsedBody) {"droupouts"
        console.log()
        console.log(parsedBody); // parsedBody contains the data sent back from the Flask server
        returndata = parsedBody; // do something with this data, here I'm assigning it to a variable.
    })
    .catch(function (err) {
        console.log(err);
    });
    
    // res.send(returndata);

      certified=returndata.droupouts.substring(1,7),
    
    console.log(certified)
    res.send(certified)
})




//update db in user
app.post('/updateUserToDB',urlencodedParser, function(req,res){
  console.log("updating..\n",req.body)
 var obj = JSON.stringify(req.body);
 var jsonObj = JSON.parse(obj);
 MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var u=req.body.userid
  var c;
  switch(u){
  // var c=new Array("HarvardX/CB22x/2013_Spring","HarvardX/CS50x/2012","HarvardX/ER22x/2013_Spring ","HarvardX/PH207x/2012_Fall","HarvardX/PH278x/2013_Spring","MITx/14.73x/2013_Spring","MITx/2.01x/2013_Spring","MITx/3.091x/2012_Fall","MITx/3.091x/2013_Spring","MITx/6.002x/2012_Fall ","MITx/6.002x/2013_Spring","MITx/6.00x/2012_Fall");
  case "MHxPC130597674":c = new Array(
    {name:"HarvardX/CB22x/2013_Spring",title:"The Ancient Greek Hero"},
    {name:"HarvardX/CS50x/2012",title:"Introduction to Computer Science (2016) "},
    {name:"MITx/3.091x/2012_Fall",title:"Introduction to Solid State Chemistry "},
    {name:"MITx/6.00x/2012_Fall ",title:"Introduction to Computer Science and Programming"}
    );
    break;

  case "MHxPC130597670":c = new Array(
      {name:"MITx/3.091x/2012_Fall",title:"Introduction to Solid State Chemistry"},
      {name:"HarvardX/PH207x/2012_Fall",title:"Health in Numbers: Quantitative Methods in Clinical and Public Health Research "},
      {name:"HarvardX/PH278x/2013_Spring",title:"Human Health and Global Environmental Change"},
      {name:"MITx/6.002x/2012_Fall",title:"Circuits and Electronics"}
    );
    break;


  case "MHxPC130597667":c = new Array(
      {name:"HarvardX/CS50x/2012",title:"Introduction to Computer Science "},
      {name:"HarvardX/ER22x/2013_Spring",title:"Justice"},
      {name:"HarvardX/PH207x/2012_Fall",title:"Health in Numbers: Quantitative Methods in Clinical and Public Health Research "},
      {name:"MITx/8.02x/2013_Spring",title:"Electricity and Magnetism"}
    );
    break;




  default:c = c = new Array(
    {name:"HarvardX/ER22x/2013_Spring",title:"Justice"},
      {name:"HarvardX/CS50x/2012",title:"Introduction to Computer Science "},
      {name:"HarvardX/PH207x/2012_Fall",title:"Health in Numbers: Quantitative Methods in Clinical and Public Health Research "},
      {name:"MITx/8.02x/2013_Spring",title:"Electricity and Magnetism"}
    );
  }
  var myquery = { name: req.body.name };
  var newvalues = { $set: {userid: req.body.userid,courses:c } };
  dbo.collection("userprofile").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
        

});
  });






  app.post('/unified',urlencodedParser, function(req,res){
  var users;
  MongoClient.connect(url,  function(err, db) {
   db.collection('userprofile').findOne({ name: req.body.name},async function(err, user) {
    users=user
             if(user ===null){
               res.end("Login invalid");
            }else if (user.name === req.body.name && user.pass === req.body.pass){
              console.log(user.userid)
              // console.log(user.courses[1])
            // res.render('unified',{profileData:user});
            var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:5000/?users='+user.userid,
        json: true // Automatically stringifies the body to JSON
    };
    
    var returndata;
    var sendrequest = await request(options)
    .then(function (parsedBody) {
        // console.log(parsedBody); // parsedBody contains the data sent back from the Flask server
        returndata = parsedBody; // do something with this data, here I'm assigning it to a variable.
    })
    .catch(function (err) {
        console.log(err);
    });
    
    // res.send(returndata);
    var response={
      certified:returndata.certify,
      droupout:returndata.droupout,
      profileData:users,
      contentbased:returndata.contentBased,
      username:req.body.name,
      password:req.body.pass
    }
    console.log("Response\n",response,"\n")
    res.render('unified',{response:response})
            console.log("retrieved user data!\n")

          } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
          }
   });
   });
   // var options = {
   //      method: 'GET',
   //      uri: 'http://127.0.0.1:5000/',
   //      json: true // Automatically stringifies the body to JSON
   //  };
    
   //  var returndata;
   //  var sendrequest = await request(options)
   //  .then(function (parsedBody) {
   //      // console.log(parsedBody); // parsedBody contains the data sent back from the Flask server
   //      returndata = parsedBody; // do something with this data, here I'm assigning it to a variable.
   //  })
   //  .catch(function (err) {
   //      console.log(err);
   //  });
    
   //  // res.send(returndata);
   //  var response={
   //    certified:returndata.certify,
   //    droupout:returndata.droupout,
   //    profileData:users,
   //    contentbased:returndata.contentBased,
   //    username:req.body.name,
   //    password:req.body.pass
   //  }
   //  console.log("Response\n",response,"\n")
   //  res.render('unified',{response:response})
 });
});

