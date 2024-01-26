const User = require("../models/userModel");
const dbService = require("./dbService");
/**
 * convertObjectToEnum : converts object to enum
 * @param {Object} obj : object to be converted
 * @return {Array} : converted Array
 */
function convertObjectToEnum(obj) {
  const enumArr = [];
  Object.values(obj).map((val) => enumArr.push(val));
  return enumArr;
}
/**
 * randomNumber : generate random numbers for given length
 * @param {number} length : length of random number to be generated (default 4)
 * @return {number} : generated random number
 */
function randomNumber (length = 4) {
  const numbers = '12345678901234567890';
  let result = '';
  for (let i = length; i > 0; i -= 1) {
    result += numbers[Math.round(Math.random() * (numbers.length - 1))];
  }
  return result;
};
/**
 * getDifferenceOfTwoDatesInTime : get difference between two dates in time
 * @param {date} currentDate  : current date
 * @param {date} toDate  : future date
 * @return {string} : difference of two date in time
 */
function getDifferenceOfTwoDatesInTime(currentDate, toDate) {
  let diffInMilliseconds = toDate - currentDate;
  let remainingSeconds = Math.floor(diffInMilliseconds / 1000);
  let remainingMinutes = Math.floor(remainingSeconds / 60);

  remainingSeconds %= 60;

  if (remainingMinutes > 0) {
    return `${remainingMinutes} minute(s) and ${remainingSeconds} second(s)`;
  } else {
    return `${remainingSeconds} second(s)`;
  }
}
// function getDifferenceOfTwoDatesInTime (currentDate,toDate){
//   let hours = toDate.diff(currentDate,'hour');
//   currentDate =  currentDate.add(hours, 'hour');
//   let minutes = toDate.diff(currentDate,'minute');
//   currentDate =  currentDate.add(minutes, 'minute');
//   let seconds = toDate.diff(currentDate,'second');
//   currentDate =  currentDate.add(seconds, 'second');
//   if (hours){
//     return `${hours} hour, ${minutes} minute and ${seconds} second`; 
//   }
//   return `${minutes} minute and ${seconds} second`; 
// }

/**
 * checkUniqueFieldsInDatabase: check unique fields in database for insert or update operation.
 * @param {Object} model : mongoose model instance of collection
 * @param {Array} fieldsToCheck : array of fields to check in database.
 * @param {Object} data : data to insert or update.
 * @param {String} operation : operation identification.
 * @param {Object} filter : filter for query.
 * @return {Object} : information about duplicate fields.
 */
const checkUniqueFieldsInDatabase = async (
  model,
  fieldsToCheck,
  data,
  operation,
  filter = {}
) => {
  switch (operation) {
    case "REGISTER":
      for (const field of fieldsToCheck) {
        let query = {
          ...filter,
          [field]: data[field],
        };
        let found = await dbService.findOne(model, query);
        if (found) {
          return {
            isDuplicate: true,
            field: field,
            value: data[field],
          };
        }
      }

      break;
    default:
      return { isDuplicate: false };
      break;
  }
  return { isDuplicate: false };
};
const generatePatientCode = async () => {
  let patientCode;

  while (true) {
    let code = Math.floor(Math.random() * 900000) + 100000;
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let prefix = '';
    for (let i = 0; i < 2; i++) {
      prefix += letters.charAt(Math.floor(Math.random() * 26));
    }
    patientCode = prefix + code;
    const exists = await dbService.findOne(User, { patientCode });
    if (!exists) {
      break;
    }
  }
 
  return patientCode;
}

module.exports = {
  convertObjectToEnum,
  checkUniqueFieldsInDatabase,
  generatePatientCode,
  randomNumber,
  getDifferenceOfTwoDatesInTime
};
