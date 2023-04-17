const express = require('express')
const app = express()
const mariadb = require('mariadb')
require('dotenv').config();

const conn = mariadb.createConnection({host: process.env.dbHost, user: process.env.dbUser, password: process.env.dbPassword})
// conn.ping().then(()=>console.log('Connection Established')).catch(err => console.log('Something went wrong'+err))


app.listen(3000, () => console.log('Server Started'))

