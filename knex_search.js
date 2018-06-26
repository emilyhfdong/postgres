const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
  // searchPath: ['knex', 'public'],
});

const searchName = process.argv[2];

function returnDateStr (date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}

function printSearchResults (rows) {
  console.log(`Found ${rows.length} by the name ${searchName}`);
  for (let i = 0; i < rows.length; i ++) {
    console.log(`- ${i + 1}: ${rows[i].first_name} ${rows[i].last_name}, born ${returnDateStr(rows[i].birthdate)}`)
  }
}

console.log("Searching ... ");

knex.select('*').from('famous_people')
.where('first_name', 'LIKE', searchName)
.orWhere('last_name', 'LIKE', searchName)
.asCallback(function(err, rows) {

  if (err) return console.error(err);

  printSearchResults(rows);
});



