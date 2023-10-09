<template>
  <div v-if="text" class="" v-html="richContent" />
</template>

<script setup lang="ts">
import { ISbRichtext } from "@storyblok/vue";

const props = defineProps<{
  text: ISbRichtext;
}>();

const richContent = computed(() => renderRichText(props?.text));
</script>
