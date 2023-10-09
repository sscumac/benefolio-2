<template>
  <MoleculesScroller :defined-scroll-width="scrollLength" class="ml-32">
    <NuxtImg
      v-if="project?.content.title_image && project.content.title_image.filename"
      provider="storyblok"
      preset="general"
      loading="lazy"
      :src="project.content.title_image.filename"
      width="640"
      height="720"
      class="object-contain sm:max-w-[250px] 2xl:max-w-[400px]"
      :style="rotate()"
    />

    <!-- <p v-if="project && project.content.text" class="ml-10 text-5xl">{{ textLength }}</p> -->

    <div class="bg-white py-30 p-10 mx-40 sm:py-10" :style="textBoxWidth">
      <h2 class="font-bold text-2xl py-2 whitespace-prewrap">
        {{ project?.name }}
      </h2>
      <h3 class="font-bold py-2 whitespace-prewrap">
        {{ project?.content.sub_title }}
      </h3>
      <AtomsRichText class="pt-2 whitespace-pre-wrap" :text="project?.content.text" />
      <!-- <p class="whitespace-pre-wrap pt-4">{{ project?.content.text }}</p> -->
      <p class="whitespace-pre-wrap pt-4">{{ project?.content.bottom_notice }}</p>
    </div>
    <NuxtImg
      v-for="pic in project?.content.images"
      provider="storyblok"
      preset="general"
      loading="lazy"
      :alt="pic.alt"
      :src="pic.filename"
      width="640"
      height="720"
      class="max-w-[75%] object-cover sm:max-w-[250px] 2xl:max-w-[400px] mx-20"
      :style="rotate()"
    />
  </MoleculesScroller>
</template>

<script setup lang="ts">
import { ProjectStoryblok } from "~/ts/interfaces/storyblok";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const route = useRoute();

let path = route.path;
const storyblokApi = useStoryblokApi();

const textLength = ref();

const scrollLength = ref<number>(0);

if (path.length > 2 && path.charAt(path.length - 1) === "/") {
  path = path.slice(0, -1);
}

const fullSlug = path === "/" || path === "" ? "home" : path;

const { data: project } = await useAsyncData<ProjectStoryblok>(`${fullSlug}`, async () => {
  const res = await storyblokApi.get(`cdn/stories${fullSlug}`, {});
  return res.data.story;
});

textLength.value = project.value?.content.text.content[0].content[0].text.length;

const rotate = () => {
  const rotation = utils.rotateImg();
  return rotation;
};

const textBoxWidth = computed(() => {
  if (project && project.value?.content.text) {
    const newTextLength = project.value?.content.text.content[0].content[0].text.length / 1.5;
    return `min-width:${newTextLength > 800 ? newTextLength : 800}px`;
  }
});

if (project && project.value?.content.images) {
  scrollLength.value = width.value + (textLength.value > 800 ? textLength.value / 4 : 200) + width.value / 10;
}

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
