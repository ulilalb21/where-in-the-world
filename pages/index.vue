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
        :key="country.cca3"
        :to="`/${country.cca3.toLowerCase()}`"
        class="box-shadow-xl h-[388px] cursor-pointer overflow-hidden rounded-lg bg-white dark:bg-oxford-blue-900"
      >
        <NuxtImg
          class="h-[200px] w-full object-cover"
          :src="country.flags.svg"
          loading="lazy"
          :alt="country.flags.alt || `Flag of ${country.name.common}`"
        />
        <div class="p-7">
          <h1 class="text-md font-bold">{{ country.name.common }}</h1>
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
              {{ country.capital[0] }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watchDebounced } from '@vueuse/core';

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
      label: 'Antarctic',
      to: '?region=antarctic',
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

const { data: countries, status: requestStatus } = useAsyncData(
  'countries',
  async () => {
    try {
      if (route.query.region) {
        return await $fetch(`/api/countries/region/${route.query.region}`);
      }

      if (route.query.search) {
        return await $fetch(`/api/countries/${route.query.search}`);
      }

      return await $fetch('/api/countries');
    } catch (error) {
      console.error(error);
    }
  },
);

watch(
  () => route.query,
  async () => {
    if (route.query.region) {
      try {
        requestStatus.value = 'pending';
        countries.value = await $fetch(
          `/api/countries/region/${route.query.region}`,
        );
        requestStatus.value = 'success';
      } catch (error) {
        requestStatus.value = 'error';
        console.error(error);
      }
    }
  },
);

const router = useRouter();
const searchKeyword = ref(route.query.search || '');
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
  async () => {
    if (route.query.search) {
      try {
        requestStatus.value = 'pending';
        countries.value = await $fetch(`/api/countries/${route.query.search}`);
        requestStatus.value = 'success';
      } catch (error) {
        requestStatus.value = 'error';
        console.error(error);
      }
    } else {
      await $fetch('/api/countries');
    }
  },
);
</script>
<style></style>
