<template>
  <div v-if="text" :class="`prose prose-a:text-goldenred max-w-[unset] ${widthClass}`" v-html="richContent" />
</template>

<script setup lang="ts">
import { type ISbRichtext } from "@storyblok/vue";

const props = defineProps<{
  text: ISbRichtext;
  manualWidth?: boolean;
}>();

const widthClass = ref("");
if (props.manualWidth) {
  widthClass.value = "sm:w-[800px]";
} else {
  widthClass.value = "";
}

const richContent = computed(() => renderRichText(props?.text));
</script>
