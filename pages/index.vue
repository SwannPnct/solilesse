<script setup>
    import { Input } from '@/components/ui/input'
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card'
    import {
        Pagination,
        PaginationEllipsis,
        PaginationFirst,
        PaginationLast,
        PaginationList,
        PaginationListItem,
        PaginationNext,
        PaginationPrev,
    } from '@/components/ui/pagination'

    import {
        Button,
    } from '@/components/ui/button'

    const route = useRoute()
    const city = computed(() => route.query.city)

    const limit = 21;
    const currentPage = ref(1);
    const cityInput = ref(city.value ?? "");

    const {data: announcements, pending, error} = await useFetch('/api/announcements', {
        lazy: true,
        query: {
            city,
            currentPage,
            limit
        },
        key: `announcements-page-${currentPage}`,
        watch: [currentPage]
    })

    const replaceQuery = async (query) => {
        await navigateTo({
                path: route.path,
                replace: true,
                query: {
                    ...route.query,
                    ...query
                }
            });
    }

    let timeout;
    watch(cityInput, () => {
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(async () => {
            currentPage.value = 1;
            await replaceQuery( {
                    city: cityInput.value
                })
        }, 400);
    }, {immediate: true})
</script>

<template>
    <div class="container py-12 relative">
        <h1 class="font-semibold text-xl mb-16">Solilesse</h1>
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
        <div v-if="pending">loading...</div>
        <div v-else-if="!!error">
            <strong class="text-red-500">Erreur.</strong>
        </div>
        <template v-else-if="!!announcements.results.length">
            <ul  class="flex flex-wrap gap-8 gap-x-16 items-center">
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
            <Pagination v-model:page="currentPage" class="mt-16 flex flex-col items-center" v-slot="{ page }" :total="announcements.total_count / limit" :sibling-count="1" show-edges>
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                    <PaginationFirst />
                    <PaginationPrev />

                    <template v-for="(item, index) in items">
                        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                        <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                            {{ item.value }}
                        </Button>
                        </PaginationListItem>
                        <PaginationEllipsis v-else :key="item.type" :index="index" />
                    </template>

                    <PaginationNext />
                    <PaginationLast />
                </PaginationList>
            </Pagination>
        </template>
        <div v-else>
            No results
        </div>
    </div>
</template>