<script setup>
   const route = useRoute()
   const announcements = useAnnouncements();
   const favAnnouncements = useFavAnnouncements();
   const deletedAnnouncements = useDeletedAnnouncements();

   const query = computed(() => route.query)
   const fullPath = computed(() => route.fullPath)
   const path = computed(() => route.path)

   const links = ref([
      ["/", "Annonces", "home"],
      ["supprimees", "Supprimées", "deleted"],
      ["favories", "Favories", "fav"]
      ].map(mapLinks))

   const tourGuideGroup = computed(() => {
      switch (path.value) {
         case "/":
            return links.value[0][2]
         case "/supprimees":
            return links.value[1][2]
         case "/favories":
            return links.value[2][2]
         default:
            break;
      }
   })

   const shouldShowTourGuideTrigger = computed(() => (tourGuideGroup.value === "home" && !!announcements.announcements.total) || (tourGuideGroup.value === "fav" && !!favAnnouncements.favAnnouncements.total) || tourGuideGroup.value === "deleted" && !!deletedAnnouncements.deletedAnnouncements.total)

   watch([query, fullPath, path], () => {
      links.value = links.value.map(mapLinks)
   })

   function mapLinks(link) {
      if(path.value === "/" && link[0].startsWith("/")) {
         return [fullPath.value, ...link.slice(1)]
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
            <div>
               <TourGuideTrigger v-if="shouldShowTourGuideTrigger" :group="tourGuideGroup"/>
            </div>
         </div>
         <div class="container py-12">
            <slot />
         </div>
     </div>
</template>