const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function(data) {
  let errors = {};

  data.user = validText(data.usernane) ? data.username : ' '
  data.password = validText(data.password) ? data.password : ' '

  if(Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if(Validator.isEmpty(data.password)) {
    errors.username = "Password field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}