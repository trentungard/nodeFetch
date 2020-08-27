const https = require('https');
const http = require('http');

function printMessage(userName, badgeCount, points){
  const message =`${userName} has ${badgeCount} total badges and ${points} total points`;
  console.log(message)
};

function printError(error){
  console.error(error.message);
}

function get(username){
  try{
    const request = https.get(`https://teamtreehouse.com/${username}.json`, (res) => {
    if(res.statusCode === 200){
      let body = "";
    res.on('data', data => {
      body += data.toString();
    });
      
    res.on('end', () => {
           try{
           const profile = JSON.parse(body);
            printMessage(username, profile.badges.length, profile.points.total);
           } catch(error) {
            printError(error)       
           }
    });
    } else {
      const message = `There was an error getting the profile for ${username} response (${http.STATUS_CODES[res.statusCode]})`;
      const statusCodeError = new Error(message)
      printError(statusCodeError);
    }
   });
  
  request.on('error', printError(error));
  
  } catch (error) { 
     printError(error)
  };
};

module.exports.get = get;