<template>
  <MoleculesScroller :defined-scroll-width="scrollLength">
    <div class="p-10 flex justify-center">
      <NuxtImg
        v-if="project?.content.title_image && project.content.title_image.filename"
        provider="storyblok"
        preset="general"
        loading="lazy"
        :src="project.content.title_image.filename"
        class="max-w-[75%] xs:max-w-[50%] sm:max-w-[400px]"
        :style="rotate()"
      />
    </div>

    <div class="bg-white z-10 p-6 sm:mx-20" :style="textBoxStyle">
      <h2 class="font-bold text-2xl py-2 whitespace-prewrap">
        {{ project?.name }}
      </h2>
      <h3 class="font-bold py-2 whitespace-prewrap">
        {{ project?.content.sub_title }}
      </h3>
      <AtomsRichText :manual-width="true" class="pt-2 pr-6 whitespace-pre-wrap" :text="project?.content.text" />
      <p class="whitespace-pre-wrap pt-4">{{ project?.content.bottom_notice }}</p>
    </div>

    <div v-for="(pic, i) in project?.content.images" :key="pic.id">
      <div
        v-if="text2position === 0 || i < text2position"
        class="p-10 sm:py-10 sm:m-20 relative h-[50vh] w-full sm:w-[400px] flex flex-col items-center"
        :class="randomFlexPosition()"
      >
        <NuxtImg
          provider="storyblok"
          preset="general"
          loading="lazy"
          :alt="pic.alt"
          :src="pic.filename"
          class="max-w-[75%] object-cover sm:max-w-[400px] mx-20"
          :style="rotate()"
        />
      </div>
    </div>

    <div
      v-if="
        project?.content?.images &&
        text2position &&
        text2position > 0 &&
        text2position < project?.content?.images?.length
      "
      class="bg-white z-10 p-6 sm:mx-20"
      :style="textBoxStyle"
    >
      <AtomsRichText :manual-width="true" class="pt-2 pr-6 whitespace-pre-wrap" :text="project?.content?.text2" />
    </div>

    <div v-for="(pic, i) in project?.content.images" :key="pic.id">
      <div
        v-if="text2position !== 0 && i + 1 > text2position"
        class="p-10 sm:py-10 sm:m-20 relative h-[50vh] w-full sm:w-[400px] flex flex-col items-center"
        :class="randomFlexPosition()"
      >
        <NuxtImg
          provider="storyblok"
          preset="general"
          loading="lazy"
          :alt="pic.alt"
          :src="pic.filename"
          class="max-w-[75%] object-cover sm:max-w-[400px] mx-20"
          :style="rotate()"
        />
      </div>
    </div>
    <div
      v-if="
        project?.content?.images &&
        project?.content?.text2 &&
        text2position &&
        text2position > 0 &&
        text2position > project?.content?.images?.length
      "
      class="bg-white sm:w-[800px] z-10 p-6 sm:mx-20"
      :style="textBoxStyle"
    >
      <AtomsRichText :manual-width="true" class="pt-2 pr-6 whitespace-pre-wrap" :text="project?.content?.text2" />
    </div>
  </MoleculesScroller>
</template>

<script setup lang="ts">
import { type ProjectStoryblok } from "~/ts/interfaces/storyblok";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const route = useRoute();

let path = route.path;
const storyblokApi = useStoryblokApi();

const textLength = ref(0);
const textBoxWidth = ref(0);
const textBoxStyle = ref("");
const scrollLength = ref<number>(0);
const text2position = ref(0);

if (path.length > 2 && path.charAt(path.length - 1) === "/") {
  path = path.slice(0, -1);
}

const fullSlug = path === "/" || path === "" ? "home" : path;

const { data: project } = await useAsyncData<ProjectStoryblok>(`${fullSlug}`, async () => {
  const res = await storyblokApi.get(`cdn/stories${fullSlug}`, {});
  return res.data.story;
});

if (project.value?.content.text2_position) {
  text2position.value = parseInt(project.value?.content.text2_position);
}

if (project.value?.content.text) textLength.value = project.value?.content.text.content[0].content[0].text.length;

const rotate = () => {
  const rotation = utils.rotateImg();
  return rotation;
};

if (width.value > 799) {
  if (project && project.value?.content.text) {
    textBoxWidth.value = 800;
    textBoxStyle.value = `width:${textBoxWidth.value}px`;
  }
}

if (project.value?.content.images) {
  let length =
    project.value?.content.images.length * 400 +
    textBoxWidth.value +
    160 +
    (text2position.value > 0 ? textBoxWidth.value + 160 : 0);
  scrollLength.value = utils.getMediaScrollWidth(length, width.value);
}

const randomFlexPosition = () => {
  const pos = utils.randomFlexPosition();
  return pos;
};

onMounted(() => {
  if (project.value?.id) {
    useStoryblokBridge(project.value.id, (evStory) => (project.value = evStory));
  }
});
</script>
<style>
.pin-spacer {
  top: 60px !important;
}
</style>
