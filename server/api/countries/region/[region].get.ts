export default defineEventHandler(async event => {
  const region = getRouterParam(event, 'region');

  const data = await $fetch(
    `https://restcountries.com/v3.1/region/${region}?fields=name,cca3,capital,region,subregion,population,flags,borders,languages,tld`,
  );

  return data;
});
