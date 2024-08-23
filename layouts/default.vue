<template>
  <div class="font-[Nunito] text-woodsmoke-950 dark:text-white">
    <nav class="bg-white dark:bg-oxford-blue-900">
      <div
        class="px-6 py-8 md:container md:mx-auto flex flex-auto justify-between items-center"
      >
        <h2 class="font-bold tracking-wide">Where in the world?</h2>
        <div
          class="flex items-center text-sm font-semibold cursor-pointer"
          @click="isDark = !isDark"
        >
          <UIcon
            :name="`i-heroicons-moon${isDark ? '-solid' : ''}`"
            class="w-4 h-4 mr-2"
          />
          Dark Mode
        </div>
      </div>
    </nav>
    <div class="bg-gray-50 dark:bg-shark-950">
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
</script>

<style></style>
