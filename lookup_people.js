// require pg driver and settings
const pg = require("pg");
const settings = require("./settings"); // settings.json

// set the command line input as searchName
const searchName = process.argv[2];

// make new client using the settings set in the settings.json file
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

// function that takes a date object and returns a string in the format YYYY-MM-DD
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

// function to print the formatted search results (includes number of results, full name and birthdate)
function printSearchResults (result) {
  console.log(`Found ${result.rowCount} by the name ${searchName}`);
  for (let i = 0; i < result.rowCount; i ++) {
    console.log(`- ${i + 1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born ${returnDateStr(result.rows[i].birthdate)}`)
  }
}

// function that makes the query based on a name
function searchQuery (name, cb) {
  console.log("Searching ...");
  client.query(`
    SELECT * FROM famous_people
      WHERE first_name LIKE '${name}'
        OR last_name LIKE '${name}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    cb(result);
    client.end();
  });
}

// connect to the database and runs searchQuery function and uses the print search results as a callback
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  searchQuery(searchName, printSearchResults)
});



