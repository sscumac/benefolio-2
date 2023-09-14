<template>
  <header class="tracking-wide">
    <!--  top-->
    <div
      class="border-t-2 border-normal-black bg-white items-center w-screen flex justify-between text-normal-black py-2 px-2"
    >
      <div class="flex-grow">
        <nuxt-link
          class="sm:ml-3 sm:whitespace-nowrap font-bold uppercase text-base md:text-xl lg:text-2xl xl:text-3xl"
          to="/"
          >Benedikt Stoll</nuxt-link
        >
      </div>
      <div>
        <!--        tabs-->
        <div
          class="whitespace-nowrap flex flex-col ml-4 lg:flex-row text-xs sm:text-base lg:text-xl xl:text-2xl"
        >
          <div
            v-for="(tab, index) in data?.tags"
            :key="index"
            class="justify-end flex items-center mr-2"
          >
            <p>• {{ tab.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!--    bottom-->
    <div
      class="border-2 border-r-0 border-l-0 border-normal-black items-center w-screen flex justify-end text-white px-8 py-2 tags font-bold text-xl lg:text-2xl xl:text-3xl"
      :class="bottomBgColor"
    >
      <div v-for="(link, index) in data?.navBar">
        <nuxt-link class="tag" :to="`/${link.link.cached_url}`">{{
          link.text
        }}</nuxt-link>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
const route = useRoute();

const storyblokApi = useStoryblokApi();
const { data } = await useAsyncData<any>("header", async () => {
  const res = await storyblokApi.get(`cdn/stories/layout/header`);
  return res.data.story.content;
});

const bottomBgColor = computed(() =>
  route.fullPath === "/" ? "bg-kingblue" : "bg-goldenred"
);
</script>
