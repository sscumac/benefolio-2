<template>
  <div class="flex min-h-screen flex-col sm:overflow-hidden">
    <OrganismsHeader class="fixed z-20" />
    <main id="main">
      <img src="~/assets/linien.png" alt="background" class="fixed object-cover min-h-screen opacity-80" />
      <slot />
    </main>
  </div>
</template>
<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
