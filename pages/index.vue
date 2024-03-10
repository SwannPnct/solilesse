<script setup>
    import { Input } from '@/components/ui/input'
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card'

    const route = useRoute()
    const city = computed(() => route.query.city)

    const cityInput = ref(city.value ?? "")


    const {data: announcements, pending, error} = await useFetch('/api/announcements', {
        lazy: true,
        query: {
            city: city
        },
    })

    let timeout;
    watch(cityInput, () => {
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(async () => {
            await navigateTo({
                path: route.path,
                replace: true,
                query: {
                    city: cityInput.value
                }
            });
        }, 400);
    }, {immediate: true})
</script>

<template>
    <div class="container py-12 relative">
        <h1 class="font-semibold text-xl">Solilesse</h1>
        <div class="mb-16">
            <h2>Filters</h2>
            <div class="flex">
                <Input 
                    v-model="cityInput"
                    placeholder="Ville" 
                    class="w-1/4 min-w-40"
                    />
            </div>
        </div>
        <div v-if="pending">loading...</div>
        <div v-else-if="!!error">
            <strong class="text-red-500">Erreur.</strong>
        </div>
        <ul v-else class="flex flex-wrap gap-8 gap-x-16 items-center">
            <li v-for="announcement in announcements.results" :key="announcement.id">
                <Card class="w-[350px]">
                    <CardHeader>
                        <CardTitle>{{ announcement.commercant }}</CardTitle>
                        <CardDescription>{{ announcement.id }}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <span>Ville: {{  announcement.ville }}</span>
                    </CardContent>
                </Card>
            </li>
        </ul>
    </div>
</template>