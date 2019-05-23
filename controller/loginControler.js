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
  var c=new Array("HarvardX/CB22x/2013_Spring","HarvardX/CS50x/2012","HarvardX/ER22x/2013_Spring ","HarvardX/PH207x/2012_Fall","HarvardX/PH278x/2013_Spring","MITx/14.73x/2013_Spring","MITx/2.01x/2013_Spring","MITx/3.091x/2012_Fall","MITx/3.091x/2013_Spring","MITx/6.002x/2012_Fall ","MITx/6.002x/2013_Spring","MITx/6.00x/2012_Fall");
  var myobj = { 
    name: req.body.name, 
    pass: req.body.pass, 
    email:req.body.email,
    institution:req.body.institution,
    gender:req.body.gender,
    participants:req.body.participants,
    courses:c};
  dbo.collection("userprofile").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
        res.render('a')

});
     

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








app.post('/dropouts',urlencodedParser,async function(req,res){
  console.log(req.body)
  var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:5000/droupoutPredict?institution='+req.body.institution+'&&participants='+req.body.participants+'&&hrs='+req.body.hrs+'&&male='+req.body.male+'&&female='+req.body.female+'&&audited='+req.body.audited+'&&title='+req.body.title,
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

      certified=returndata.droupouts.substring(2,7),
    
    console.log(certified)
    res.send(certified)
})








  app.post('/unified',urlencodedParser,async function(req,res){
    var users;
     MongoClient.connect(url,  function(err, db) {
   db.collection('userprofile').findOne({ name: req.body.name}, function(err, user) {
    users=user
             if(user ===null){
               res.end("Login invalid");
            }else if (user.name === req.body.name && user.pass === req.body.pass){
              console.log(user)
              console.log(user.courses[1])
            // res.render('unified',{profileData:user});

          } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
          }
   });
   });
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
    var response={
      certified:returndata.certify,
      droupout:returndata.droupout,
      profileData:users
    }
    // res.render('unified',{data:returndata,profileData:users})
    res.render('unified',{response:response})
 });
});


