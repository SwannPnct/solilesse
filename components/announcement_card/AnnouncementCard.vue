<script setup>
     import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card';

   defineProps(['announcement']);

   const clicked = ref(false)
   const li = ref(null)

   onMounted(() => {
    document.addEventListener('click', (e) => {
        if(!li.value.contains(e.target) && clicked.value) {
            clicked.value = false;
        }
    })
   })

   const onItemClick = () => {
    if(!clicked.value) clicked.value = true;
   }
</script>

<template>
    <li ref="li" :class="'self-start transition-all duration-700 w-[350px] ' + (!clicked ? 'h-[225px]' : 'h-[450px]') " @click="onItemClick">
        <Card class="size-full transition-all hover:shadow-lg cursor-pointer">
            <CardHeader>
                <CardTitle class="text-lg">{{ announcement.commercant }}</CardTitle>
                <CardDescription>{{ announcement.id }}</CardDescription>
            </CardHeader>
            <CardContent class="announcement__card-content">
                <p><span>Date de parution:</span> {{ announcement.dateparution }}</p>
                <p><span>Ville:</span> {{  announcement.ville }}</p>
                <p><span>Type:</span> {{ announcement.typeavis_lib }}</p>
                <p><span>Famille:</span> {{ announcement.familleavis_lib }}</p>
            </CardContent>
        </Card>
    </li>
</template>