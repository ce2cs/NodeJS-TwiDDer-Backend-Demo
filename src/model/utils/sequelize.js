const Sequelize = require('sequelize')
const {MYSQL_CONF} = require('../../config/db')
const {isProd, isTest} = require('../../utils/env')

const {host, user, password, database} = MYSQL_CONF;
const conf = {
  host,
  dialect: 'mysql'
};

if (isTest) {
  conf.logging = () => {
  }
}

if (isProd) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000
  }
}

const seq = new Sequelize(database, user, password, conf);

module.exports = seq;