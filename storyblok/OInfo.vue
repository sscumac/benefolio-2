<template>
  <OrganismsInfo v-if="blok" v-editable="blok" :blok="blok" />
</template>

<script setup lang="ts">
defineProps<{
  blok: any;
}>();
</script>
