const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTeamInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { max: 32 })) {
    errors.name = 'Team name must be under 32 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};