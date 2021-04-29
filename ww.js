// test function

// const wwObject = {
//   weatherToday(postcode) {
//     console.log(`INSIDE OBJ: weather today @ ${postcode} is: FINE`);
//   },
// };
const weatherToday = (postcode, wwAPI) => {
  console.log(`OUTSIDE OBJ: weather today @ ${postcode} is: FINE`);
  console.log(wwAPI);
};

// module.exports.wwObject = wwObject;
module.exports.weatherToday = weatherToday;
