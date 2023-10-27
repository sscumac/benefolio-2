<template>
  <MoleculesScroller align="top" :padding-top="true" :defined-scroll-width="scrollWidth" v-if="blok">
    <NuxtImg
      v-if="blok.portrait && blok.portrait.filename"
      provider="storyblok"
      preset="general"
      loading="lazy"
      :src="blok.portrait.filename"
      width="640"
      height="720"
      class="object-contain sm:max-w-[280px] 2xl:max-w-[400px]"
    />

    <AtomsRichText :text="blok.info_text" class="whitespace-pre-wrap bg-white p-6 sm:mx-10 sm:min-w-[600px]" />

    <AtomsRichText
      v-for="textBox in blok.impressum"
      :key="textBox._uid"
      class="whitespace-pre-wrap bg-white p-6 sm:mx-10 sm:min-w-[600px]"
      :text="textBox.text_element"
    />
  </MoleculesScroller>
</template>

<script setup lang="ts">
import { type InfoStoryblok } from "~/ts/interfaces/storyblok";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const scrollWidth = ref();

const props = defineProps<{
  blok: InfoStoryblok;
}>();

// scrollWidth.value = width.value;
scrollWidth.value = width.value + (width.value > 1440 ? width.value / 2 : width.value / 4);

if (props.blok?.impressum) {
  // get length for all project containers (for larger text boxes calculate a little less)
  let length = props.blok.impressum.length * 600 + 600;
  scrollWidth.value = utils.getMediaScrollWidth(length, width.value);
}
</script>
