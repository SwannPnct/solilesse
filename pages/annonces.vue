<script setup>
import useCurrentPage from '~/composables/useCurrentPage';

    const announcements = useAnnouncements();

    const route = useRoute()
    const city = computed(() => route.query.city)
    const family = computed(() => route.query.family)
    const reset = computed(() => route.query.reset)

    const limit = 3;
    const orderBy = "parution DESC";

    const {page, currentPage} = useCurrentPage();

    const query = computed(() => ({
        city: city.value,
        page: page.value,
        family: family.value,
        reset: reset.value,
        limit,
        orderBy
    }));

    const {pending, error} = await useAsyncData(
        "announcements", 
        () => announcements.fetchAnnouncements(query.value), 
        {
            lazy: true,
            server: false,
            watch: [query]
        })
</script>

<template>
    {{ console.log('pending', pending) }}
    {{ console.log('data', announcements.announcements.pages) }}
    <Filters />
    <div v-if="!!error">
        <strong class="text-red-500">
            {{ error }}
        </strong>
    </div>
    <div v-else>
        <Paginator :limit/>
        <div v-if="pending" class="flex flex-wrap gap-16 items-center">
            <div  v-for="_ in Array(limit)"  class="border border-gray-200 rounded-lg w-[350px] p-4 animate-pulse flex flex-col gap-4">
                <div class="mb-4 space-y-2">
                    <Skeleton class="h-6 w-[250px]" />
                    <Skeleton class="h-4 w-[150px]" />
                </div>
                <div class="space-y-2">
                    <Skeleton class="h-5 w-[60px]" />
                    <Skeleton class="h-5 w-[60px]" />
                    <Skeleton class="h-5 w-[230px]" />
                    <Skeleton class="h-[70px] w-[300px]" />
                </div>
        </div>
        </div>
        <TransitionGroup v-else name="list" tag="ul" class="relative flex flex-wrap gap-16 items-center">
            <AnnouncementCard 
                v-for="announcement in announcements.announcements.pages[currentPage]" 
                :key="announcement.id" 
                :announcement />
        </TransitionGroup>
        <Paginator :limit/>
    </div>
</template>

<style>
    .list-move,
    .list-leave-active {
        transition: all 0.5s ease;
    }
    
    .list-leave-to {
        opacity: 0;
        transform: translate(150%,-300px);
    }

    .list-leave-active {
        position: absolute;
    }
</style>