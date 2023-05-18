const mysql = require('./node_modules/mysql2/promise');

const pool = mysql.createPool({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.database,
});

module.exports = {
    getConnection(){
        return new Promise(function(result, reject){
            pool.getConnection().
            then(function(conn){
               result(conn);
            }).
            catch(function(error){
                reject(error);
            });
        });
    }
 };
 