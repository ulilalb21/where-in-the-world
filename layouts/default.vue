<template>
  <div class="font-[Nunito] text-woodsmoke-950 dark:text-white">
    <nav
      class="px-4 py-8 flex flex-auto justify-between items-center bg-white dark:bg-oxford-blue-900"
    >
      <h2 class="font-bold tracking-wide">Where in the world?</h2>
      <div
        class="flex items-center text-sm font-semibold"
        @click="isDark = !isDark"
      >
        <UIcon
          :name="`i-heroicons-moon${isDark ? '-solid' : ''}`"
          class="w-4 h-4 mr-2"
        />
        Dark Mode
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
