<template>
  <div ref="template" class="wrapper sm:ml-20">
    <div
      ref="scrollingWrapper"
      class="pt-36 relative z-10 sm:whitespace-nowrap h-[100vh] flex flex-col sm:flex-row"
      :class="[
        paddingTop ? 'pt-28 sm:pt-[15vh]' : 'sm:pt-0',
        `  ${availableAlignment[align as keyof typeof availableAlignment]}  `,
      ]"
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
    paddingTop?: boolean;
  }>(),
  {
    align: "center",
  }
);

const scrollingWrapper = ref();
const template = ref();

let scrollWidth = ref<number>(0);

onMounted(() => {
  const container: HTMLElement = scrollingWrapper.value;
  const document: HTMLElement = template.value;
  if (props.definedScrollWidth) scrollWidth.value = props.definedScrollWidth;

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
