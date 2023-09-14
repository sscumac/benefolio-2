<template>
  <div class="wrapper ml-20">
    <div
      ref="scrollingWrapper"
      :class="`pt-[20vh] whitespace-nowrap h-[100vh] flex flex-col ${availableAlignment[align as keyof typeof availableAlignment]} sm:flex-row `"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp();
const { $ScrollTrigger } = useNuxtApp();

const availableAlignment = {
  top: "items-start",
  center: "items-center",
  bottom: "items-end",
};

withDefaults(
  defineProps<{
    align?: string;
  }>(),
  {
    align: "center",
  }
);

const route = useRoute();
let path = route.path;

const scrollingWrapper = ref();

onMounted(() => {
  const container: HTMLElement = scrollingWrapper.value;

  const width = container?.scrollWidth - 1000;

  let mm = $gsap.matchMedia();
  mm.add("(min-width: 800px)", () => {
    $gsap.to(container, {
      x: () => -width + "px",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        invalidateOnRefresh: true,
        pin: true,
        scrub: 1,
        // end: () => "+=" + container.offsetWidth,
      },
    });
  });
});
onBeforeUnmount(() => {
  scrollingWrapper.value = 0;
});
</script>
