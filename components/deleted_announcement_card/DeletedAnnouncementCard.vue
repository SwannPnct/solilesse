<script setup>
    const props = defineProps(['announcement']);
</script>

<template>
    <Card class="bg-gray-100">
        <CardContent class="flex justify-between items-center p-6">
                <CardTitle class="text-lg">{{ announcement.commercant }}</CardTitle>
                <CardDescription>{{ announcement.id }}</CardDescription>
                <div>{{ announcement.dateparution }}</div>
                <div>{{ announcement.ville }}</div>
                <div>{{ announcement.familleavis_lib }}</div>
            </CardContent>
        </Card>
</template>