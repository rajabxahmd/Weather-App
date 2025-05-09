<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start p-1">
    <div class="w-full max-w-2xl space-y-6 bg-white p-2 rounded-lg shadow">
      <h3 class="text-2xl font-semibold text-center text-gray-700">Weather History</h3>

      <div class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <select
          v-model="cityHistory"
          class="flex-1 px-4 py-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option disabled value="">Select a city</option>
          <option>Delhi</option>
          <option>Moscow</option>
          <option>Paris</option>
          <option>New York</option>
          <option>Sydney</option>
          <option>Riyadh</option>
        </select>

        <input
          v-model="fromDate"
          type="date"
          class="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="toDate"
          type="date"
          class="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        @click="fetchHistory"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Get History
      </button>

      <div v-if="weatherHistory.length > 0" class="space-y-4">
        <div
          v-for="(weather, index) in weatherHistory"
          :key="index"
          class="bg-yellow-100 p-4 rounded-lg shadow text-center space-y-2"
        >
          <p class="text-orange-600 font-semibold text-lg">
            {{ weather.city }} - {{ weather.temperature }}°C
          </p>
          <p class="text-orange-500">{{ weather.description }}</p>
          <img
            :src="`http://openweathermap.org/img/wn/${weather.icon}.png`"
            alt="weather icon"
            class="mx-auto w-12 h-12"
          />
          <p class="text-sm text-gray-700">{{ formatTimestamp(weather.date) }}</p>
        </div>
      </div>

      <p v-if="errorMessage" class="text-red-600 text-center font-medium">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      cityHistory: '',
      fromDate: '',
      toDate: '',
      weatherHistory: [],
      errorMessage: '',
    };
  },
  methods: {
    formatTimestamp(ms) {
        const date = new Date(Number(ms));
        
        const formatted = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        
        
        hour12: true,
        });

        return formatted
            },
    async fetchHistory() {
      try {
        this.errorMessage = '';
        const response = await axios.post('http://localhost:4000/graphql', {
          query: `
            query {
              getWeatherHistory(city: "${this.cityHistory}", from: "${this.fromDate}", to: "${this.toDate}") {
                city
                temperature
                description
                icon
                date
              }
            }
          `,
        });
        this.weatherHistory = response.data?.data?.getWeatherHistory || [];
      } catch (error) {
        this.errorMessage = 'Failed to fetch weather history';
        console.error(error);
      }
    },
  },
};

</script>
