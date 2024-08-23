export default defineEventHandler(async event => {
  const code = getRouterParam(event, 'code');

  const data = await $fetch(
    `https://restcountries.com/v3.1/alpha/${code}?fields=name,cca3,capital,region,subregion,population,flags,borders,languages,tld,currencies`,
  );

  return data;
});
