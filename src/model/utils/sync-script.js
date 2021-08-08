const seq = require('./sequelize')

require('../index');

seq.authenticate().then(() => {
  console.log('auth succeed')
}).catch(() => {
  console.log('auth failed')
});

seq.sync({ force: true }).then(() => {
  console.log('sync succeed')
  process.exit()
});
