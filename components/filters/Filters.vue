<script setup>
    import { Input } from '@/components/ui/input';
    import { replaceQuery } from '@/lib/utils';

    const route = useRoute()
    const city = computed(() => route.query.city)

    const cityInput = ref(city.value ?? "");

    let timeout;
    watch(cityInput, () => {
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(async () => {
            await replaceQuery(route,  {
                    page: 1,
                    city: cityInput.value
                })
        }, 400);    
    }, {immediate: true})
</script>

<template>
    <div class="mb-16">
        <h2 class="mb-4">Filters</h2>
        <div class="flex">
            <Input 
                v-model="cityInput"
                placeholder="Ville" 
                class="w-1/4 min-w-40"
                />
        </div>
    </div>
</template>
