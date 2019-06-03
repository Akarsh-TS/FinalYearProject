$(document).ready(function(){
   $("#regBtn").click(function(){
       $.ajax({
         type : 'GET',
         url : '/register',
         success: function(data){
           $("#mainDiv").html(data);
         }
       });
   });

   $("#loginBtn").click(function(){
     var uname  = $("#uname").val();
     var upass = $("#upass").val();
     window.localStorage.setItem("uname",uname)
     window.localStorage.setItem("upass",upass)

     var loginData ={'name': uname,'pass':upass};
     $.ajax({
         type : 'POST',
         url : '/unified',
         data : loginData,
         success: function(data){
         $("#mainDiv").html(data);
         }
       });
   });

   $("#dashboard").click(function(){
     var uname  = window.localStorage.getItem("uname",uname);
     var upass = window.localStorage.getItem("upass",upass);
     
     var loginData ={'name': uname,'pass':upass};
     $.ajax({
         type : 'POST',
         url : '/unified',
         data : loginData,
         success: function(data){
         $("#mainDiv").html(data);
         }
       });
   });

   //====logout

   $("#profile").click(function(){
    console.log(window.localStorage.getItem("uname"))
    var uname  = window.localStorage.getItem("uname")
    var upass = window.localStorage.getItem("upass")
    var loginData ={'name': uname,'pass':upass};
    $.ajax({
         type : 'POST',
         url : '/p',
         data : loginData,
         success: function(data){
         $("#mainDiv").html(data);
         }
       });

   })
  

    $("#certify").click(function(){
       $.ajax({
         type : 'GET',
         url : '/register',
         success: function(data){
           $("body").html(data);
         }
       });
     });
   //=====Login Form Request=============================================
   $("#loginForm").click(function(){
     var uname  = $("#name").val();
     var upass = $("#upass").val();
     var loginData ={'name': uname,'pass':upass};
     $.ajax({
         type : 'POST',
         url : '/demo',
         data : loginData,
         success: function(data){
         $("#mainDiv").html(data);
         }
       });

   });

   $("#Courses").click(function(){

    $.ajax({
         type : 'GET',
         url : '/input',
         success: function(data){
         $("#body").html(data);
         }
       });
   })

   $("#profile").click(function(){

    $.ajax({
         type : 'GET',
         url : '/profile',
         success: function(data){
         $("#body").html(data);
         }
       });
   })

   $("#Courses1").click(function(){

    $.ajax({
         type : 'GET',
         url : '/input1',
         success: function(data){
         $("#body").html(data);
         }
       });
   })


   $("#certifyPredict").click(function(){
    var nevents=$("#nevents").val();
    var ndays=$("#ndays").val();
    var nchapters=$("#nchapters").val();
    var nforums=$("#nforums").val();

    var dataa={
      'nevents':nevents,
      'ndays':ndays,
      'nchapters':nchapters,
      'nforums':nforums
    };
    $.ajax({
        type:'POST',
        url:'/certify',
        data:dataa,
        success:function(data){
          document.getElementById("c").innerHTML =data
        }
    });
   });







    $("#droupoutPredict").click(function(){
    var institution=$("#institution").val();
    var participants=$("#participants").val();
    var hrs=$("#hrs").val();
    var male=$("#male").val();
    var female=$("#Female").val();
    var audited=$("#audited").val();
    var title=$("#title").val();
    var dataa={
      'institution':institution,
      'participants':participants,
      'hrs':hrs,
      'male':male,
      'female':female,
      'audited':audited,
      'title':title
    };
    $.ajax({
        type:'POST',
        url:'/dropouts',
        data:dataa,
        success:function(data){
          document.getElementById("c").innerHTML =data
        }
    });
   });







//=====Register Form=============================================
   $("#regForm").click(function(){
     var uname  = $("#name").val();
     var upass = $("#upass").val();
     var email = $("#email").val();
     var institution = $("#institution").val();
     var participants = $("#participants").val();
     var gender = $("#gender").val();
     items=["MHxPC130597674","MHxPC130597670","MHxPC130597667","MHxPC130597665","MHxPC130597661","MHxPC130597659","MHxPC130597654","MHxPC130597653","MHxPC130597652"]
     var item = items[Math.floor(Math.random()*items.length)];
     var regData ={'name': uname,'pass':upass,'email':email,'institution':institution,'participants':participants,'gender':gender,'userid':item};
       $.ajax({
         type : 'POST',
         url : '/regiterToDb',
         data : regData,
         success: function(data){
         $("#mainDiv").html(data);
         }
       });
   });

//update
   $("#updateProfile").click(function(){
     var uname  = $("#uname").val();
     var upass = $("#upass").val();
     var userid=$("#uid").val();
     var regData ={'name': uname,'pass':upass,'userid':userid};
     console.log(regData)
       $.ajax({
         type : 'POST',
         url : '/updateUserToDB',
         data : regData,
         success: function(data){
          console.log("updated")
         alert("Updated")
         }
       });
   });
//api1===
$("#api1").click(function(){

       $.ajax({
         type : 'POST',
         url : '/demo',
         success: function(data){
         $("#mainDiv").html(data);
         }
       });
   });
   //=========api2===========
   $("#api2").click(function(){

       $.ajax({
         type : 'POST',
         url : '/api2',
         success: function(data){
         $("#mainDiv").html(data);
         }
       });
   });

   //==api3
   $("#api3").click(function(){

       $.ajax({
         type : 'POST',
         url : '/api3',
         success: function(data){
         $("#mainDiv").html(data);
         }
       });
   });

   //==api4
   $("#api4").click(function(){

       $.ajax({
         type : 'POST',
         url : '/api4',
         success: function(data){
         $("#mainDiv").html(data);
         }
       });
   });
   //==logout
   $("#Logout").click(function(){

       $.ajax({
         type : 'GET',
         url : '/',
         success: function(data){
         $("#mainDiv").html(data);
         }
       });
   });
//Save profile Data================================================
$('#saveBtn').click(function(){
  var email = $("#email").val();
  var phone = $("#phone").val();
  var education = $("#education").val();
  var aoi = $("#aoi").val();
  var name = $("#name").val();
  var pass = $("#pass").val();
  var profileData = {'email':email,'phone':phone,'education' : education,'aoi':aoi,'name' : name,'pass' : pass};
  $.ajax({
    type : 'POST',
    url : '/completeprofile',
    data : profileData,
    success : function(data){
       $("#mainDiv").html(data);
    }
  });
});
});