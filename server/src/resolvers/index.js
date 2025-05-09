const axios = require('axios');
const Weather = require('../models/Weather');

const OPENWEATHER_API = `https://api.openweathermap.org/data/2.5/weather`;

const resolvers = {
  Query: {
    async getCurrentWeather(_, { city }) {
      const apiKey = "236e8cfa99285d275e7226b3825a89d2";

      try {
        const response = await axios.get(OPENWEATHER_API, {
          params: {
            q: city,
            units: 'metric',
            appid: apiKey
          }
        });

        const { temp } = response.data.main;
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;

        const weather = new Weather({
          city,
          temperature: temp,
          description,
          icon
        });

        await weather.save();

        return weather;
      } catch (error) {
        console.error("Weather API error:", error.response?.data || error.message);
        throw new Error("Failed to fetch weather data");
      }
    },

    async getWeatherHistory(_, { city, from, to }) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      const diffDays = (toDate - fromDate) / (1000 * 60 * 60 * 24);
      if (diffDays > 30) {
        throw new Error("Date range must be 30 days or less.");
      }

      const weatherHistory = await Weather.find({
        city,
        date: {
          $gte: fromDate,
          $lte: toDate
        }
      });

      return weatherHistory.map((weather) => {
        weather.date = new Date(weather.date).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }); 
        return weather;
      });
    }
  }
};

module.exports = resolvers;
