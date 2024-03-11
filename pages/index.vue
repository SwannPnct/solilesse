<script setup>
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
    import { replaceQuery } from '~/lib/utils';

    const route = useRoute()
    const city = computed(() => route.query.city)
    const page = computed(() => route.query.page)

    const limit = 21;
    const currentPage = ref(page.value ? parseInt(page.value, 10) : 1);

    const {data: announcements, pending, error} = await useFetch('/api/announcements', {
        lazy: true,
        query: {
            city,
            page,
            limit
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
    <div class="container py-12 relative">
        <h1 class="font-semibold text-xl mb-16">Solilesse</h1>
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
                            <CardTitle>{{ announcement.commercant }}</CardTitle>
                            <CardDescription>{{ announcement.id }}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <span>Ville: {{  announcement.ville }}</span>
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
    </div>
</template>