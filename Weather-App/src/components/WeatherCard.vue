<template>
  <div class="min-h-screen bg-gray-300 flex flex-col justify-center items-center px-4">
    <div class="w-full max-w-md space-y-4 text-center">
      <input
        v-model="city"
        placeholder="Enter city"
        @keyup.enter="fetchWeather"
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        @click="fetchWeather"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Get Weather
      </button>

      <div v-if="weatherData" class="bg-orange-200 rounded-xl p-6 shadow space-y-4">
        <div class="flex items-center justify-center space-x-4">
          <img
            :src="`http://openweathermap.org/img/wn/${weatherData.icon}.png`"
            alt="weather icon"
            class="w-16 h-16"
          />
          <p class="text-3xl font-semibold text-orange-600">
            {{ weatherData.temperature }}°C
          </p>
        </div>
        <h2 class="text-2xl font-bold text-orange-600">{{ weatherData.city }}</h2>
        <p class="text-lg text-orange-500">{{ weatherData.description }}</p>
      </div>

      <p v-if="errorMessage" class="text-red-600 font-medium">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      city: '',
      weatherData: null,
      errorMessage: '',
    };
  },
  methods: {
    async fetchWeather() {
      try {
        this.errorMessage = '';
        const response = await axios.post('http://localhost:4000/graphql', {
          query: `
            query {
              getCurrentWeather(city: "${this.city}") {
                city
                temperature
                description
                icon
              }
            }
          `,
        });
        this.weatherData = response.data?.data?.getCurrentWeather || null;
      } catch (error) {
        this.errorMessage = 'Failed to fetch weather data';
        console.error(error);
      }
    },
  },
};
</script>
