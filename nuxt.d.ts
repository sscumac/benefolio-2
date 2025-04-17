// types/nuxt.d.ts
import { NuxtConfig } from "@nuxt/schema";

declare module "@nuxt/schema" {
  interface NuxtConfig {
    storyblok?: {
      accessToken: string | undefined;
      devtools?: boolean;
    };
  }
}
