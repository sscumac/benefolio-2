<template>
  <component :is="story.content.component" v-if="story" :blok="story.content" />
</template>

<script setup lang="ts">
import { type StoryStoryblok } from "~~/ts/interfaces/storyblok";

const route = useRoute();
let path = route.path;

if (path.length > 2 && path.charAt(path.length - 1) === "/") {
  path = path.slice(0, -1);
}

const fullSlug = path === "/" || path === "" ? "home" : path;

const storyblokApi = useStoryblokApi();

const { data: story } = await useAsyncData<StoryStoryblok>(path, async () => {
  const res = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
    version: "published",
  });
  return res.data.story;
});

if (!story.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

onMounted(() => {
  if (story.value?.id) {
    useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory));
  }
});
</script>
