module.exports = function (app) {
  app.use('/', require('./user'));
  app.use('*', require('../middleware/auth'));
  app.use('/', require('./passwordManager'));
};
