<template>
     <div class="container relative">
         <div class="flex justify-between py-6">
            <NuxtLink class="block flex gap-4 items-center cursor-pointer" to="/">
               <img class="size-10" src="~/assets/images/logo.webp" alt="Solilesse logo"/>
               <h1 class="font-semibold text-xl">
                  Solilesse
               </h1>
            </NuxtLink>
            <div class="flex gap-4 items-center">
               <NuxtLink class="block hover:underline" to="/annonces">
                  Annonces
               </NuxtLink>
            </div>
         </div>
         <div class="container py-12">
            <slot />
         </div>
     </div>
</template>