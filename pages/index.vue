<template>
  <div class="p-6 md:container md:mx-auto">
    <div class="md:flex md:items-center md:justify-between">
      <UInput
        v-model="searchKeyword"
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
      class="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <NuxtLink
        v-for="country in countries"
        :key="country.name"
        :to="`/${country.alpha2Code.toLowerCase()}`"
        class="box-shadow-xl h-[388px] cursor-pointer overflow-hidden rounded-lg bg-white dark:bg-oxford-blue-900"
      >
        <NuxtImg
          class="h-[200px] w-full object-cover"
          :src="country.flag"
          loading="lazy"
        />
        <div class="p-7">
          <h1 class="text-md font-bold">{{ country.name }}</h1>
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
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import data from '../data.json';

import { watchDebounced } from '@vueuse/core';

definePageMeta({
  title: 'Where in the world?',
});

const formatter = new Intl.NumberFormat('en-US');
const formatNumber = (num: number) => formatter.format(num);

const countries = ref(data);
const regions = [
  [
    {
      label: 'Africa',
      to: '?region=africa',
    },
    {
      label: 'America',
      to: '?region=americas',
    },
    {
      label: 'Asia',
      to: '?region=asia',
    },
    {
      label: 'Europe',
      to: '?region=europe',
    },
    {
      label: 'Oceania',
      to: '?region=oceania',
    },
  ],
];

const route = useRoute();
watch(
  () => route.query,
  () => {
    if (route.query.region) {
      countries.value = data.filter(
        country => country.region.toLowerCase() === route.query.region,
      );
    }
  },
);

const router = useRouter();
const searchKeyword = ref('');
watchDebounced(
  () => searchKeyword.value,
  () => {
    if (searchKeyword.value) {
      router.push({ query: { search: searchKeyword.value } });
    } else {
      router.push({ query: {} });
    }
  },
  { debounce: 1000, maxWait: 5000 },
);
watch(
  () => route.query.search,
  () => {
    if (route.query.search) {
      countries.value = data.filter(country =>
        country.name
          .toLowerCase()
          .includes((route.query.search as string).toLowerCase()),
      );
    } else {
      countries.value = data;
    }
  },
);
</script>
<style></style>
