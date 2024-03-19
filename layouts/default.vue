<template>
     <div class="container relative">
         <div class="flex py-6">
            <NuxtLink class="block flex gap-4 items-center cursor-pointer" to="/">
               <img class="size-10" src="~/assets/images/logo.webp" alt="Solilesse logo"/>
               <h1 class="font-semibold text-xl">
                  Solilesse
               </h1>
            </NuxtLink>
         </div>
         <div class="container py-12">
            <slot />
         </div>
     </div>
</template>