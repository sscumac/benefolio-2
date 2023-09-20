<template>
  <div ref="template" class="wrapper ml-20">
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

const props = withDefaults(
  defineProps<{
    align?: string;
    definedScrollWidth?: number;
  }>(),
  {
    align: "center",
  }
);

// const route = useRoute();
// let path = route.path;

const scrollingWrapper = ref();
const template = ref();

let scrollWidth = ref<number>(4000);

onMounted(() => {
  const container: HTMLElement = scrollingWrapper.value;
  const document: HTMLElement = template.value;

  // console.log("container scrollwidth", container.scrollWidth);
  // console.log("container client width", container.clientWidth);

  setTimeout(() => console.log("container scrollwidth timed", container.scrollWidth), 100);

  // const pinSpacer = document.getElementsByClassName("pin-spacer");

  // setTimeout(() => console.log("pin spacer width: ", pinSpacer[0].offsetWidth), 100);
  // setTimeout(() => console.log("pin spacer height: ", pinSpacer[0].offsetHeight), 100);

  // const width = container?.scrollWidth - 1000;

  if (props.definedScrollWidth && props.definedScrollWidth > 0) {
    scrollWidth.value = props.definedScrollWidth;
  }

  let mm = $gsap.matchMedia();
  mm.add("(min-width: 800px)", () => {
    $gsap.to(container, {
      x: () => -scrollWidth.value + "px",
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
