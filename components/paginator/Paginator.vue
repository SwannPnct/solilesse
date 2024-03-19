<script setup>
import useCurrentPage from '~/composables/useCurrentPage';

    defineProps({
        limit: Number,
    })

    const announcements = useAnnouncements();

    const { currentPage} = useCurrentPage();
</script>

<template>
    <Pagination v-model:page="currentPage" class="my-16 flex flex-col items-center" v-slot="{ page: innerPage }" :itemsPerPage="limit" :total="announcements.announcements.total" :sibling-count="1" show-edges>
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