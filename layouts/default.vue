<template>
  <div
    class="min-h-screen bg-gray-50 font-[Nunito] text-woodsmoke-950 dark:bg-shark-950 dark:text-white"
  >
    <nav class="fixed z-10 h-[88px] w-full bg-white dark:bg-oxford-blue-900">
      <div
        class="flex flex-auto items-center justify-between px-6 py-8 md:container md:mx-auto"
      >
        <h2 class="font-bold tracking-wide">Where in the world?</h2>
        <div
          class="flex cursor-pointer items-center text-sm font-semibold"
          @click="isDark = !isDark"
        >
          <UIcon
            :name="`i-heroicons-moon${isDark ? '-solid' : ''}`"
            class="mr-2 h-4 w-4"
          />
          Dark Mode
        </div>
      </div>
    </nav>
    <div class="pt-[88px]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});

useSeoMeta({
  title: 'Where in the world? | Frontend Mentor Challenge',
  ogTitle: 'Where in the world? | Frontend Mentor Challenge',
  description:
    'This is a solution to the REST Countries API with color theme switcher challenge on Frontend Mentor Frontend Mentor challenges help you improve your coding skills by building realistic projects.',
  ogDescription:
    'This is a solution to the REST Countries API with color theme switcher challenge on Frontend Mentor Frontend Mentor challenges help you improve your coding skills by building realistic projects.',
});

useHead({
  title: 'Where in the world? | Frontend Mentor Challenge',
  meta: [
    {
      name: 'description',
      content:
        'This is a solution to the REST Countries API with color theme switcher challenge on Frontend Mentor Frontend Mentor challenges help you improve your coding skills by building realistic projects.',
    },
  ],
  htmlAttrs: {
    lang: 'en',
  },
});
</script>

<style></style>
