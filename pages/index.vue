<template>
  <div class="md:container md:mx-auto p-6">
    <div class="md:flex md:justify-between md:items-center">
      <UInput
        class="mb-10 md:w-1/3"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="lg"
        color="white"
        :trailing="false"
        placeholder="Search for a country..."
      />
      <UDropdown :items="regions" class="mb-8">
        <UButton
          size="lg"
          color="white"
          label="Filter By Region"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
      </UDropdown>
    </div>
    <div
      class="flex flex-col items-center md:flex-wrap md:flex-row md:justify-between"
    >
      <div
        v-for="country in data"
        :key="country.code"
        class="w-[300px] h-[380px] box-shadow-md bg-white dark:bg-oxford-blue-900 mb-10 box-shadow-lg rounded-lg overflow-hidden cursor-pointer"
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
const regions = [
  [
    {
      label: 'Africa',
    },
    {
      label: 'America',
    },
    {
      label: 'Asia',
    },
    {
      label: 'Europe',
    },
    {
      label: 'Oceania',
    },
  ],
];
const formatNumber = (num: number) => formatter.format(num);
</script>
<style></style>
