<script setup>
    import "vue-multiselect/dist/vue-multiselect.css"; 
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card';
    import {
        Pagination,
        PaginationEllipsis,
        PaginationFirst,
        PaginationLast,
        PaginationList,
        PaginationListItem,
        PaginationNext,
        PaginationPrev,
    } from '@/components/ui/pagination';

    import {
        Button,
    } from '@/components/ui/button';
    import { replaceQuery } from '~/lib/utils';

    const route = useRoute()
    const city = computed(() => route.query.city)
    const page = computed(() => route.query.page)
    const family = computed(() => route.query.family)

    const limit = 21;
    const orderBy = "parution DESC";

    const currentPage = ref(page.value ? parseInt(page.value, 10) : 1);

    const {data: announcements, pending, error} = await useFetch('/api/announcements', {
        lazy: true,
        server: false,
        query: {
            city,
            page,
            limit,
            orderBy,
            family
        },
        key: `announcements-page-${page}`,
        watch: [page]
    })

    watch(currentPage, async () => {
        await replaceQuery(route,  {
            page: currentPage.value
        })
    })

    watch(page, () => {
        if(page !== currentPage) {
            currentPage.value = parseInt(page.value, 10)
        }
    })
</script>

<template>
    <Filters />
    <div v-if="pending">loading...</div>
    <div v-else-if="!!error">
        <strong class="text-red-500">Erreur.</strong>
    </div>
    <template v-else-if="!!announcements.results.length">
        <ul  class="flex flex-wrap gap-8 gap-x-16 items-center">
            <li v-for="announcement in announcements.results" :key="announcement.id">
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
        </ul>
        <Pagination v-model:page="currentPage" class="mt-16 flex flex-col items-center" v-slot="{ page: innerPage }" :total="announcements.total_count / limit" :sibling-count="1" show-edges>
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                <PaginationFirst />
                <PaginationPrev />

                <template v-for="(item, index) in items">
                    <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                    <Button class="w-10 h-10 p-0" :variant="item.value === innerPage ? 'default' : 'outline'">
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
</template>

<style>
    .announcement__card-content p span {
        @apply font-semibold;
    }
</style>