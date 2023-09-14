<template>
  <div class="flex min-h-screen flex-col overflow-x-hidden sm:overflow-hidden">
    <OrganismsHeader class="fixed z-20" />
    <main id="main">
      <img
        src="~/assets/grid.png"
        alt="background grid"
        class="w-full xl:scale-100 min-h-screen object-cover fixed opacity-50"
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
