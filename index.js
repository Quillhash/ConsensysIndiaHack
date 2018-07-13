var express = require('express');
var app = express();
var path = require('path')
const civicSip = require('civic-sip-api');

// Step 4: Initialize instance passing your appId and secret.
const civicClient = civicSip.newClient({
  appId: 'Bkz9vkLXQ',
  prvKey: '93dda0c5ac640f5e77f351210d35adca535543aaf3045391feb3b00995deceb4',
  appSecret: '8620fa8c33fd86100becd3c0a1004bf6',
});
var port= 3000 || process.env.port
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname +'/index.html'));

})
app.post('/login',(req,res)=>{
// Step 5: Exchange authorization code for user data.
console.log(req.headers['authorization']);
var jwtToken = req.headers['authorization'];

// Step 5: Exchange authorization code for user data.
civicClient.exchangeCode(jwtToken)
    .then((userData) => {
        // store user data and userId as appropriate
        console.log('userData = ', JSON.stringify(userData, null, 4));
        res.render(path.join(__dirname +'/dashboard-new-user.html'))
    }).catch((error) => {
        console.log(error);
    });
})

app.listen(port,()=>{
    console.log("listening");
})