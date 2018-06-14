const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLeagueInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.shortName = !isEmpty(data.shortName) ? data.shortName : '';
  data.slug = !isEmpty(data.slug) ? data.slug : '';
  data.website = !isEmpty(data.website) ? data.website : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.shortName)) {
    errors.shortName = 'Short Name field is required';
  }

  if (Validator.isEmpty(data.slug)) {
    errors.slug = 'Slug field is required';
  }

  if (Validator.isEmpty(data.website)) {
    errors.website = 'Website field is required';
  }

  if (!Validator.isURL(data.website, { require_protocol: true })) {
    errors.website = 'Website is invalid';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
