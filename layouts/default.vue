<script setup>
   const route = useRoute()
   const query = computed(() => route.query)
   const fullPath = computed(() => route.fullPath)
   const path = computed(() => route.path)

   const links = ref([
      ["/", "Annonces"],
      ["supprimees", "Supprimées"],
      ["favories", "Favories"]
      ].map(mapLinks))

   watch([query, fullPath, path], () => {
      links.value = links.value.map(mapLinks)
   })

   function mapLinks(link) {
      if(link[0].includes(path.value) || (link[0] === "/" && path.value === "/")) {
            return [fullPath.value, link[1]]
      }
         return [...link]
   }
</script>

<template>
     <div class="container relative">
         <div class="flex py-6 items-center" id="tour-home-4">
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