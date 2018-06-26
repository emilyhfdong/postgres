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


const new_first_name = process.argv[2];
const new_last_name = process.argv[3];
const new_birthdate = process.argv[4];

knex('famous_people').insert({
  first_name: new_first_name,
  last_name: new_last_name,
  birthdate: new_birthdate
})
.asCallback(function() {
  // knex.select('*').from('famous_people')
  // .asCallback(function(err, rows) {
  //   if (err) return console.error(err);
  //   console.log(rows);
  // });
});









