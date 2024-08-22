<template>
  <div class="p-6">
    <div class="flex flex-col items-center">
      <div
        v-for="country in data"
        :key="country.code"
        class="w-[300px] h-[380px] box-shadow-md bg-white dark:bg-oxford-blue-900 mb-10 box-shadow-lg rounded-lg overflow-hidden"
      >
        <NuxtImg class="w-full h-[200px] object-cover" :src="country.flag" />
        <div class="p-7">
          <h1 class="font-bold text-md">{{ country.name }}</h1>
          <div class="mt-4 text-sm">
            <p>
              <span class="font-semibold">Population: </span>
              {{ formatNumber(country.population) }}
            </p>
            <p>
              <span class="font-semibold">Region: </span>
              {{ country.region }}
            </p>
            <p>
              <span class="font-semibold">Capital: </span>
              {{ country.capital }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import data from '../data.json';
const formatter = new Intl.NumberFormat('en-US');

definePageMeta({
  title: 'Where in the world?',
});

const formatNumber = (num: number) => formatter.format(num);
</script>
<style></style>
