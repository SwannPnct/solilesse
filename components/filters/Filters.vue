<script setup>
    import "vue-multiselect/dist/vue-multiselect.css"; 
    import Multiselect from 'vue-multiselect'
    import { replaceQuery } from '@/lib/utils';

    const route = useRoute()
    const cityQuery = computed(() => route.query.city)
    const cityValue = ref(cityQuery.value ? {value: cityQuery.value, label: cityQuery.value} : '')
    const familyQuery = computed(() => route.query.family)
    const familyValue = ref(familyQuery.value ? {value: familyQuery.value, label: familyQuery.value} : '')

    const families = [
        'Créations',
        'Immatriculations',
        'Ventes et cessions'
    ]

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
            city: cityValue.value?.value ?? "",
            page: 1,
            reset: true
        })
    })

    watch(familyValue, async () => {
        await replaceQuery(route, {
            family: familyValue.value?.value ?? "",
            page: 1,
            reset: true
        })
    })
</script>

<template>
    <div class="mb-16" id="tour-home-1">
        <h2 class="mb-4">Filters</h2>
        <div class="flex gap-12">
            <Multiselect 
                v-model="cityValue"
                :options="cities" 
                placeholder="Chercher une ville" 
                label="label" 
                track-by="value" 
                />
            <Multiselect 
                v-model="familyValue"
                :options="families.map((v) => ({label: v, value: v}))" 
                placeholder="Sélectionner une famille d'avis" 
                label="label" 
                track-by="value" 
                :searchable="false"
            />
        </div>
    </div>
</template>

<style>
    .multiselect__option--highlight {
            background: #111827 !important;
        }

    .multiselect__option--highlight:after {
        background: #111827 !important;
    }
</style>