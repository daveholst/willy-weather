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

```js
const { weatherToday, weatherForecast } = require("./ww.js");

const wwAPI = "yourAPIkey";
```

Functions will take either a location name
