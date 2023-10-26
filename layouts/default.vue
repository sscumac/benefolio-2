<template>
  <div class="flex min-h-screen flex-col sm:overflow-hidden">
    <OrganismsHeader class="fixed z-20" />
    <main id="main">
      <img
        src="~/assets/minimal_halftone_pattern_background.jpg"
        alt="background grid"
        class="fixed min-h-screen opacity-50"
      />
      <slot />
    </main>
  </div>
</template>
<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
