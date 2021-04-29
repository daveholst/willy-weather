// import axios
const axios = require('axios').default;

// test function

// const wwObject = {
//   weatherToday(postcode) {
//     console.log(`INSIDE OBJ: weather today @ ${postcode} is: FINE`);
//   },
// };
function weatherToday(location, wwToken) {
  // search the location and get an id
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.willyweather.com.au/v2/${wwToken}/search.json?query=${location}`
      )
      .then((res) => {
        // console.log(res.data);
        // console.log(res.data[0].id);
        const stationID = res.data[0].id;
        // make 3 requests for all required data
        axios
          .all([
            axios.get(
              `https://api.willyweather.com.au/v2/${wwToken}/locations/${stationID}/weather.json?observational=true`
            ),
            axios.get(
              `https://api.willyweather.com.au/v2/${wwToken}/weather/summaries.json?ids=${stationID}`
            ),
            axios.get(
              `https://api.willyweather.com.au/v2/${wwToken}/locations/${stationID}/weather.json?forecasts=rainfall&days=1`
            ),
          ])
          // build the object
          .then(
            axios.spread((res1, res2, res3) => {
              const weather = {
                stationName: res1.data.location.name,
                currentTemp:
                  res1.data.observational.observations.temperature.temperature,
                forecastTemp:
                  res2.data[0].forecasts.weather.days[0].entries[0].precis,
                forecastMax:
                  res2.data[0].forecasts.weather.days[0].entries[0].max,
                forecastMin:
                  res2.data[0].forecasts.weather.days[0].entries[0].min,
                currentHumidity:
                  res1.data.observational.observations.humidity.percentage,
                windSpeed: res1.data.observational.observations.wind.speed,
                windDir:
                  res1.data.observational.observations.wind.directionText,
                rainTotal:
                  res1.data.observational.observations.rainfall.todayAmount,
                rainForecast:
                  res2.data[0].forecasts.weather.days[0].entries[0].precis,
                rainChance:
                  res3.data.forecasts.rainfall.days[0].entries[0].probability,
                rainRangeStart: res3.data.forecasts.rainfall.days[0].entries[0]
                  .startRange
                  ? res3.data.forecasts.rainfall.days[0].entries[0].startRange
                  : '0',
                rainRangeDivide:
                  res3.data.forecasts.rainfall.days[0].entries[0].rangeDivide,
                rainRangeEnd:
                  res3.data.forecasts.rainfall.days[0].entries[0].endRange,
              };
              return resolve(weather);
            })
          )
          .catch((err) => {
            console.log(err);
            return reject(err);
          });
      });
  });
}

function weatherForecast(location, wwToken) {
  // function to convert date to day of week.
  function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][dayOfWeek];
  }
  // return promise with forecast
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.willyweather.com.au/v2/${wwToken}/search.json?query=${location}`
      )
      .then((res) => {
        const stationID = res.data[0].id;
        // make 2 requests for all required data
        axios
          .all([
            axios.get(
              `https://api.willyweather.com.au/v2/${wwToken}/locations/${stationID}/weather.json?forecasts=weather&days=5`
            ),
            axios.get(
              `https://api.willyweather.com.au/v2/${wwToken}/locations/${stationID}/weather.json?forecasts=rainfall&days=5`
            ),
          ])
          // build the object
          .then(
            axios.spread((res1, res2) => {
              const forecast = [res1.data.location.name];

              for (let i = 0; i < 5; i++) {
                const dayForecast = {
                  date: res1.data.forecasts.weather.days[i].entries[0].dateTime,
                  day: getDayOfWeek(
                    res1.data.forecasts.weather.days[i].entries[0].dateTime
                  ),
                  description:
                    res1.data.forecasts.weather.days[i].entries[0].precis,
                  minTemp: res1.data.forecasts.weather.days[i].entries[0].min,
                  maxTemp: res1.data.forecasts.weather.days[i].entries[0].max,
                  rain:
                    res2.data.forecasts.rainfall.days[i].entries[0].rangeCode,
                  rainChance:
                    res2.data.forecasts.rainfall.days[i].entries[0].probability,
                };
                forecast.push(dayForecast);
              }
              return resolve(forecast);
            })
          )
          .catch((err) => {
            console.log(err);
            return reject(err);
          });
      });
  });
}

// module.exports.wwObject = wwObject;
module.exports.weatherToday = weatherToday;
module.exports.weatherForecast = weatherForecast;
