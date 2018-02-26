const http = require('http');
const https = require('https');
const fields = ['name', 'life_cycle', 'state']
const format = 'json'

const apiPath = 'https://apiportalu34f5b50f-p1942719152trial.hanatrial.ondemand.com/apiportal/api/1.0/Management.svc/APIProxies?$select=name,life_cycle,state&$format=json'

https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
