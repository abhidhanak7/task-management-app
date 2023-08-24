const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({  
    dialect: process.env.dialect,
    host: process.env.host,
    port: 3306,
    username: 'root',
    password: process.env.password,
    database: process.env.database,
 });

 sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });


module.exports = sequelize;