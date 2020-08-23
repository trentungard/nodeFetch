const https = require('https');

function printMessage(userName, badgeCount, points){
  const message =`${userName} has ${badgeCount} total badges and ${points} total points`;
  console.log(message)
};

function printError(error){
  console.error(error.message);
}

function getProfile(username){
  try{
    const request = https.get(`https://teamtreehouse.com/${username}.json`, (res) => {
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
   });
  
  request.on('error', printError(error));
  
  } catch (error) { 
     printError(error)
  };
};

const users = ['trentungard'];
users.push(process.argv.slice(2));
users.forEach(getProfile);