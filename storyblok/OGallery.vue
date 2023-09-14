<template>
  <OrganismsGallery v-if="blok" v-editable="blok" :blok="blok" />
</template>

<script setup lang="ts">
// import { ContentTypesPageStoryblok } from "~~/ts/interfaces/component-types-sb";

defineProps<{
  blok: any;
}>();
</script>
