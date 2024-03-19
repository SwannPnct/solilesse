<template>
     <div class="container relative">
         <div class="flex py-6">
            <a class="block flex gap-4 items-center cursor-pointer" href="/">
               <img class="size-10" src="~/assets/images/logo.webp" alt="Solilesse logo"/>
               <h1 class="font-semibold text-xl">
                  Solilesse
               </h1>
            </a>
         </div>
         <div class="container py-12">
            <slot />
         </div>
     </div>
</template>