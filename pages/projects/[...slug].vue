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

    <div class="bg-white py-30 p-10 mx-40 sm:py-10 max-w-fit">
      <h2 class="font-bold text-2xl py-2 whitespace-prewrap">
        {{ project?.name }}
      </h2>
      <h3 class="font-bold py-2 whitespace-prewrap">
        {{ project?.content.sub_title }}
      </h3>
      <AtomsRichText class="whitespace-pre-wrap pt-2" :text="project?.content.text" />
      <p class="pt-4">{{ project?.content.bottom_notice }}</p>
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
const route = useRoute();
let path = route.path;
const storyblokApi = useStoryblokApi();

const scrollLength = ref<number>(0);

if (path.length > 2 && path.charAt(path.length - 1) === "/") {
  path = path.slice(0, -1);
}

const fullSlug = path === "/" || path === "" ? "home" : path;

const { data: project } = await useAsyncData<ProjectStoryblok>(`${fullSlug}`, async () => {
  const res = await storyblokApi.get(`cdn/stories${fullSlug}`, {});
  return res.data.story;
});

const rotate = () => {
  const rotation = utils.rotateImg();
  return rotation;
};

onMounted(() => {
  if (project.value?.id) {
    useStoryblokBridge(project.value.id, (evStory) => (project.value = evStory));
  }

  if (project && project.value) {
    scrollLength.value = project.value.content.images.length * 400;
  }
});
</script>
