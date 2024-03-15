<script setup>
     import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card';

   defineProps(['announcement'])
</script>

<template>
    <li>
        <Card class="w-[350px]">
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