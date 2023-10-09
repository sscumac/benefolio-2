<template>
  <!-- <pre class="pt-32">{{ blok.impressum }}</pre> -->
  <MoleculesScroller align="top" :padding-top="true" :defined-scroll-width="scrollWidth" v-if="blok">
    <NuxtImg
      v-if="blok.portrait && blok.portrait.filename"
      provider="storyblok"
      preset="general"
      loading="lazy"
      :src="blok.portrait.filename"
      width="640"
      height="720"
      class="object-contain sm:max-w-[250px] 2xl:max-w-[400px]"
    />

    <AtomsRichText :text="blok.info_text" class="whitespace-pre-wrap bg-white p-6 mx-10 min-w-[575px]" />

    <AtomsRichText
      v-for="textBox in blok.impressum"
      :key="textBox._uid"
      class="whitespace-pre-wrap bg-white p-6 mx-10 min-w-[575px]"
      :text="textBox.text_element"
    />
  </MoleculesScroller>
</template>

<script setup lang="ts">
import { InfoStoryblok } from "~/ts/interfaces/storyblok";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const scrollWidth = ref();

defineProps<{
  blok: InfoStoryblok;
}>();

scrollWidth.value = width.value + width.value / 2;
</script>
