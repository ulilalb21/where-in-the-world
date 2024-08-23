export default defineEventHandler(async event => {
  const data = await $fetch(
    'https://restcountries.com/v3.1/all?fields=name,cca3,capital,region,subregion,population,flags,borders,languages,tld',
  );

  return data;
});
