// const _=require('lodash');
const express=require('express');
const http = require('http');
const WebSocket = require('ws');
const path=require('path');
var url = require('url');
const fs=require('fs');
let cors=require('cors');
const server = http.createServer();
const wss1 = new WebSocket.Server({ noServer: true });

var mongoose= require('./server/db/mongoose.js');

var {ambulance}= require('./server/models/ambulance.js');
const port=process.env.PORT || 3000;

var bodyParser= require('body-parser');

//important parameters in order for code to run
let app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.get("/",(req,res)=>{ //main
    res.send('you are in home');

});


app.post('/updateambulance',(req,res)=>{
    console.log(req.body);
    res.send('I got it');
    // ambulance.countDocuments( function (err, count) {
    //     console.log('hey')
    // var obj=new ambulance({name:req.body.name,mobile_Number:req.body.number,
    //     "loc": {
    //         "type": "Point",
    //         "coordinates": [req.body.long, req.body.lat]
    //     },"vehicle_id":count+1});
    //     obj.save().then((result,err)=>{
    //
    //         res.redirect('/');
    //     })
    //     })
})
app.post('/ambulance',(req,res)=>{
    console.log(req.body);
    ambulance.findOneAndUpdate({name:"mitesh"},{"loc": {
        "type": "Point",
        "coordinates": [req.body.longitude, req.body.latitude]
    },"online":req.body.status},(err,result)=>{
        console.log("succesfully updated");
        res.send('ok updated');
    })
});
app.get('/getAmbulance',(req,res)=>{
    console.log(req.body);
    ambulance.findOne({name:"mitesh"},(err,result)=>{
        res.send({"lat":result.loc.coordinates[1],"long":result.loc.coordinates[0],"status":result.online})
    })
});

app.listen(port,()=>{
    console.log('server is high on port ',port);
 })
