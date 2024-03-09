// dateUtils.js

// Define the function to convert date to desired format
function convertToDesiredFormat(date) {
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
  var day = ("0" + date.getDate()).slice(-2);
  var year = date.getFullYear();

  // Create the desired format "YYYY-MM-DD"
  var desiredFormat = year + "-" + month + "-" + day;

  return desiredFormat;
}

// Export the function to make it available for use in other files
module.exports = { convertToDesiredFormat };
