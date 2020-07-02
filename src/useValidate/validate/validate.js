import validate from 'validate.js';
import XRegExp from 'xregexp';

const dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;

function isValidDate(str) {
  const date = new Date(str);
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();

  if (day.length === 1) day = '0' + day;
  if (month.length === 1) month = '0' + month;

  return `${month}/${day}/${year}` === str;
}

validate.extend(validate.validators.datetime, {
  parse: function (value) {
    if (!value) {
      return false;
    }

    if (!dateRegExp.test(value)) {
      return true;
    }

    return !isValidDate(value);
  },

  format: function (value) {
    return value;
  },
});

validate.validators.customFormat = (value, options) => {
  if (!value) {
    return;
  }

  try {
    const { pattern } = options;
    const ignoreCase = pattern.includes('(?i)');
    const patternStr = pattern
      .replace(/\\A/i, '^')
      .replace(/\\Z/i, '$')
      .replace(/\(\?i\)/g, '');
    const regExp = new XRegExp(patternStr, ignoreCase ? 'i' : undefined);
    const message = options.message || '^is invalid';

    if (regExp.test(value)) {
      return;
    }

    return message;
  } catch (err) {}
};

export { validate };
