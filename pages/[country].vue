<template>
  <div class="px-6 py-10 md:container md:mx-auto md:py-14">
    <UButton
      color="white"
      icon="i-heroicons-arrow-left"
      size="lg"
      @click="router.back()"
      >Back</UButton
    >
    <div class="my-12 lg:flex lg:items-start lg:gap-20">
      <NuxtImg
        class="lg:w-2/5 xl:w-1/2"
        :src="data.country.flags.svg"
        loading="lazy"
        :alt="data.country.flags.alt || `Flag of ${data.country.name.common}`"
      />
      <div class="mt-12 lg:mt-0">
        <div class="text-lg font-bold lg:text-2xl">
          {{ data.country.name.common }}
        </div>
        <div class="text-sm lg:mt-4 lg:grid lg:grid-cols-2">
          <div class="mt-4 lg:mt-0">
            <p class="mt-2">
              <span class="font-semibold">Native Name: </span>
              {{ getNativeName(data.country.name) }}
            </p>
            <p class="mt-2">
              <span class="font-semibold">Population: </span>
              {{ formatNumber(data.country.population) }}
            </p>
            <p class="mt-2">
              <span class="font-semibold">Region: </span>
              {{ data.country.region }}
            </p>
            <p class="mt-2">
              <span class="font-semibold">Sub Region: </span>
              {{ data.country.subregion }}
            </p>

            <p class="mt-2">
              <span class="font-semibold">Capital: </span>
              {{ data.country.capital[0] }}
            </p>
          </div>
          <div class="mt-6 lg:mt-0">
            <p class="mt-2">
              <span class="font-semibold">Top Level Domain: </span>
              {{ data.country.tld[0] }}
            </p>
            <p class="mt-2">
              <span class="font-semibold">Currencies: </span>
              {{
                Object.values(data.country.currencies)
                  .map(currency => currency.name)
                  .join(', ')
              }}
            </p>
            <p class="mt-2">
              <span class="font-semibold">Languages: </span>
              {{ Object.values(data.country.languages).join(', ') }}
            </p>
          </div>
        </div>
        <div
          v-if="data.borders"
          class="lg:mt-12 lg:flex lg:flex-row lg:items-start lg:gap-2"
        >
          <div class="mt-6 text-base font-semibold lg:mt-0 lg:min-w-[130px]">
            Border Countries:
          </div>
          <div class="mt-2 flex flex-wrap gap-2 lg:ml-2 lg:mt-0">
            <UButton
              v-for="border in data.borders"
              :key="border.name.common"
              :to="`/${border.cca3.toLowerCase()}`"
              color="white"
              >{{ border.name.common }}</UButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const { data } = await useAsyncData('country', async () => {
  try {
    const country = await $fetch('/api/countries/code/' + route.params.country);
    const borders =
      country.borders && country.borders.length
        ? await $fetch(
            'https://restcountries.com/v3.1/alpha?codes=' +
              country.borders.join(',') +
              '&fields=name,cca3',
          )
        : null;
    return { country, borders };
  } catch (error) {
    console.error(error);
  }
});

function getNativeName(name) {
  return Object.values(name.nativeName)[0].common;
}
</script>

<style></style>
