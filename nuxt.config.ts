// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  gsap: {
    extraPlugins: {
      scrollTrigger: true,
    },
  },
  runtimeConfig: {
    storyBlokToken: process.env.STORYBLOK_KEY,
  },
  build: {
    transpile: ["fsevents"], // transpilation: 'source to source' compiler which translates one higher level language to another higher level language (while compilation converts code into machine understandable code)
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@hypernym/nuxt-gsap",
    "@nuxt/image-edge",
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.STORYBLOK_KEY,
        devtools: true,
      },
    ],
    "@nuxt/image",
  ],
  image: {
    storyblok: {
      baseURL: "https://a.storyblok.com",
    },
    presets: {
      general: {
        modifiers: {
          format: "webp",
          quality: "80",
        },
      },
    },
  },
});
