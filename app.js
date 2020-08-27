const profile = require('./profile'); 

const users = ['trentungard'];
users.push(process.argv.slice(2));
users.forEach(profile.get);