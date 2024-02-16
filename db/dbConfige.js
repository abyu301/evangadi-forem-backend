const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  user: "evangadi-admin",
  database: "evangadi-forem-db",
  host: "localhost",
  password: "123456",
  port: 3308,
  connectionLimit: 10,
});

// dbConnection.execute("SELECT 'test 123'", (err, result) => {
//     if (err) {
//         console.log(err.message);
//     } else {
//         console.log(result);
//     }
// });

module.exports = dbConnection.promise();
