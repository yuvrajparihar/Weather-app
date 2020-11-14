const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}))  ;

app.get("/", function(req , res){
   

    
res.sendFile(__dirname+"/index.html")
   
})

app.post("/",function(req, res){
  const query = req.body.cityName;
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=1e1f51d71c1a18a04c3fc4c6b2131bb7&units=metric";

https.get(url ,function(response){
   console.log(response.statusCode);
   
  response.on("data",function(data){
    const info = JSON.parse(data);
    console.log(info.main.temp);
    const icon = info.weather[0].icon;
   
    const imageUrl ="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    
    res.write("<p>The weather is currently "+info.weather[0].description+"</p>")
    res.write("<h1>temperature in "+query+" is "+info.main.temp+"</h1>")
    // res.send("<h1>temperature in london is "+info.main.temp+"</h1>")
    res.write("<img src="+imageUrl+">")
    res.send();
    
  })
})
})



app.listen(3000, function(){
  console.log("server started");
});