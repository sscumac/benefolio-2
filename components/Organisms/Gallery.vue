<template>
  <MoleculesScroller :defined-scroll-width="definedScrollWidth">
    <div
      v-for="project in allProjects"
      :key="project.id"
      class="py-30 p-10 sm:py-10 sm:m-20 relative h-[50vh] w-full sm:w-[400px] flex flex-col"
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
          class="max-w-[75%] xs:max-w-[50%] sm:max-w-[280px] 2xl:max-w-[400px]"
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

const definedScrollWidth = ref<number>(0);

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

if (allProjects.value?.length) {
  // get length for all project images
  let length = allProjects.value.length * 400;
  // unused length approx. 1/2 of screen width
  const unusedLength = width.value - length / 2;
  // for larger screens subtract unused length from total length
  length = width.value > 1600 ? length - unusedLength : length;
  // for smaller screens (e.g. Ipad Pro) add half of screen width to total length
  definedScrollWidth.value = width.value < 1440 ? length + width.value / 2 : length;
}
</script>
