const {mysql} = require("../../../config")
const Sequelize = require('sequelize');

const sequelize = new Sequelize("api-keys", mysql.USER, mysql.PASSWORD, {
    host: mysql.HOST,
    dialect: "mysql"
})

const db = {};
db.sequelize = sequelize;
db.models = {}
db.models.User = require('./user')(sequelize, Sequelize.DataTypes);

module.exports = db;
