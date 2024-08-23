export default defineEventHandler(async event => {
  const name = getRouterParam(event, 'name');

  const data = await $fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,cca3,capital,region,subregion,population,flags,borders,languages,tld`,
  );

  return data;
});
