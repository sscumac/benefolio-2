<template>
  <div v-editable="blok" class="w-full">
    <component
      :is="item.component"
      v-for="item in blok.body"
      :key="item._uid"
      :blok="item"
    />
  </div>
</template>

<script setup lang="ts">
// import { ContentTypesPageStoryblok } from "~~/ts/interfaces/component-types-sb";

defineProps<{
  blok: any;
}>();
</script>
