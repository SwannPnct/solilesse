<script setup>
   const links = [
      ["/annonces", "Annonces"],
      ["/supprimees", "Supprimées"]
   ]
</script>

<template>
     <div class="container relative">
         <div class="flex py-6 items-center">
            <NuxtLink class="block flex gap-4 items-center cursor-pointer" to="/">
               <img class="size-10" src="~/assets/images/logo.webp" alt="Solilesse logo"/>
               <h1 class="font-semibold text-xl">
                  Solilesse
               </h1>
            </NuxtLink>
            <div class="flex gap-4 items-center m-auto">
               <NuxtLink v-for="link in links" exactActiveClass="underline" class="block hover:underline" :to="link[0]">
                  {{ link[1] }}
               </NuxtLink>
            </div>
         </div>
         <div class="container py-12">
            <slot />
         </div>
     </div>
</template>