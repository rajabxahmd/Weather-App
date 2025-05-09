<template>
  <div class="min-h-screen bg-cover bg-center flex justify-center items-start p-1" :style="backgroundStyle">
    <div class="w-full max-w-2xl space-y-6 bg-white/80 p-6 rounded-lg shadow">
      <h1 class="text-3xl font-bold text-center text-gray-800 py-6">Weather App</h1>
      <WeatherCard />
      <WeatherHistory />
    </div>
  </div>
</template>

<script>
import WeatherCard from './components/WeatherCard.vue';
import WeatherHistory from './components/WeatherHistory.vue';

export default {
  name: 'App',
  components: {
    WeatherCard,
    WeatherHistory,
  },
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `url('https://images.unsplash.com/photo-1557316655-8715fdecd2d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhbG0lMjBuYXR1cmV8ZW58MHx8MHx8fDA%3D')`,
      };
    },
  },
};
</script>

<style>
/* Optional: Prevent overflow */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}
</style>
