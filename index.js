var express = require('express');
var app = express();
var path = require('path')
const civicSip = require('civic-sip-api');
const bodyParser = require('body-parser');



// Step 4: Initialize instance passing your appId and secret.
const civicClient = civicSip.newClient({
  appId: 'Bkz9vkLXQ',
  prvKey: '93dda0c5ac640f5e77f351210d35adca535543aaf3045391feb3b00995deceb4',
  appSecret: '8620fa8c33fd86100becd3c0a1004bf6',
});
var port= 4200 || process.env.port;

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname +'/index.html'));

})
app.post('/login',(req,res)=>{
// Step 5: Exchange authorization code for user data.
console.log(req.body.token);
var jwtToken = req.body.token;

// Step 5: Exchange authorization code for user data.
civicClient.exchangeCode(jwtToken)
    .then((userData) => {
        // store user data and userId as appropriate
        console.log('userData = ', JSON.stringify(userData, null, 4));
        res.json(userData).status(200);
    }).catch((error) => {
        console.log(error);
    });
})

app.listen(port,()=>{
    console.log("listening");
})