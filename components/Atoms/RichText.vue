<template>
  <div v-if="text" class="prose prose-a:text-goldenred max-w-[unset]" v-html="richContent" />
</template>

<script setup lang="ts">
import { type ISbRichtext } from "@storyblok/vue";

const props = defineProps<{
  text: ISbRichtext;
}>();

const richContent = computed(() => renderRichText(props?.text));
</script>
