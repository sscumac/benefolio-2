<template>
  <MoleculesScroller :defined-scroll-width="definedScrollWidth">
    <div
      v-for="project in allProjects"
      :key="project.id"
      class="card-any py-30 p-10 sm:py-10 sm:m-20 relative h-[50vh] w-full sm:w-[400px] 2xl:w-[600px] flex flex-col"
      :class="randomFlexPosition()"
    >
      <nuxt-link :to="`projects/${project.slug}`" class="flex justify-center items-center">
        <h2 class="absolute z-10 p-1 px-4 bg-white whitespace-normal">
          {{ project.name }}
        </h2>

        <NuxtImg
          v-if="project.content.title_image && project.content.title_image.filename"
          provider="storyblok"
          preset="general"
          loading="lazy"
          :src="project.content.title_image.filename"
          width="640"
          height="720"
          class="max-w-[75%] sm:max-w-[250px] 2xl:max-w-[400px] object-cover"
          :style="rotate()"
        />
      </nuxt-link>
    </div>
  </MoleculesScroller>
</template>

<script setup lang="ts">
const storyblokApi = useStoryblokApi();
import utils from "~/utils/utils";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const { data: allProjects } = await useAsyncData<any>("projects", async () => {
  const res = await storyblokApi.get(`cdn/stories`, {
    starts_with: "projects",
  });
  return res.data.stories;
});

const randomFlexPosition = () => {
  const pos = utils.randomFlexPosition();
  return pos;
};

const rotate = () => {
  const rotation = utils.rotateImg();
  return rotation;
};

const definedScrollWidth = computed(() => {
  return allProjects.value.length * (width.value / 4) + width.value / 4;
});
</script>
