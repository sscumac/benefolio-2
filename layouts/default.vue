<template>
  <div class="flex min-h-screen flex-col sm:overflow-hidden">
    <OrganismsHeader class="fixed z-20" />
    <main
      id="main"
      style="
        background-image: url(&quot;/linien.png&quot;);
        background-size: cover;
        background-repeat: repeat;
        background-size: contain;
      "
    >
      <slot />
    </main>
  </div>
</template>
<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
