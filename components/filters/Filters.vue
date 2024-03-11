<script setup>
    import Multiselect from 'vue-multiselect'
    import { replaceQuery } from '@/lib/utils';

    const route = useRoute()
    const cityQuery = computed(() => route.query.city)
    const cityValue = ref(cityQuery.value ? {value: cityQuery.value, label: cityQuery.value} : '')

    const {data: cities} = useFetch('/api/cities', {
        lazy: true,
        server: false,
        transform: (cities) => {
            return cities.map(({nom}) => ({ value: nom, label: nom })).sort();
        },
        default: () => [],
    })

    watch(cityValue, async () => {
        await replaceQuery(route, {
            city: cityValue.value.value
        })
    })
</script>

<template>
    <div class="mb-16">
        <h2 class="mb-4">Filters</h2>
        <div>
            <Multiselect 
                v-model="cityValue"
                :options="cities" 
                placeholder="Choisir une ville" 
                label="label" 
                track-by="value" 
                />
        </div>
    </div>
</template>

<style>
    .multiselect__option--highlight {
            background: #111827;
        }

    .multiselect__option--highlight:after {
        background: #111827;
    }
</style>