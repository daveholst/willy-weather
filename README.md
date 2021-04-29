# willy-weather

node.js willy-weather module

## API Key

The willy weather API is quite good for Australian Weather. It is free for the first 5000/calls per month and then $0.000103875 for each subsequent call.

Get an API Key from here: https://www.willyweather.com.au/info/api.html

The key will be linked to a credit card so it is advisable to use a .env file.

## Dependencies

axios - https://www.npmjs.com/package/axios

## How to use

Add the appropriate require to your file. Also add a variable for your API key(better do this with .env if using a public github repo)

Functions will take either a location name or postcode (string or int) as first argument.

```js
const { weatherToday, weatherForecast } = require("./ww.js");

const wwAPI = "yourAPIkey";
```

### Todays Conditions

Returns an object that contains:

```js
{
  stationName: 'Dawesville - Oceanside',
  currentTemp: 23.1,
  forecastTemp: 'Showers. Possible late storm',
  forecastMax: 25,
  forecastMin: 18,
  currentHumidity: 79,
  windSpeed: 33.3,
  windDir: 'NW',
  rainTotal: 0,
  rainForecast: 'Showers. Possible late storm',
  rainChance: 100,
  rainRangeStart: 15,
  rainRangeDivide: '-',
  rainRangeEnd: 20
}
```

```js
async function test2() {
  const weather = await weatherToday(6211, wwAPI);
  console.log(weather);
}

test2();
```

### 5 Day Forecast

Returns an object containing the following:

```js
[
  "Dawesville - Oceanside",
  {
    date: "2021-04-29 00:00:00",
    day: "Thursday",
    description: "Showers. Possible late storm",
    minTemp: 18,
    maxTemp: 25,
    rain: "15-25",
    rainChance: 100,
  },
  {
    date: "2021-04-30 00:00:00",
    day: "Friday",
    description: "Possible early storm. Showers",
    minTemp: 13,
    maxTemp: 20,
    rain: "1-5",
    rainChance: 50,
  },
  {
    date: "2021-05-01 00:00:00",
    day: "Saturday",
    description: "Partly cloudy",
    minTemp: 12,
    maxTemp: 21,
    rain: "0",
    rainChance: 10,
  },
  {
    date: "2021-05-02 00:00:00",
    day: "Sunday",
    description: "Partly cloudy",
    minTemp: 12,
    maxTemp: 22,
    rain: "0",
    rainChance: 15,
  },
  {
    date: "2021-05-03 00:00:00",
    day: "Monday",
    description: "Partly cloudy",
    minTemp: 12,
    maxTemp: 21,
    rain: "0",
    rainChance: 10,
  },
];
```

```js
async function test() {
  const forecast = await weatherForecast("6211", wwAPI);
  console.log(forecast);
}

test();
```
