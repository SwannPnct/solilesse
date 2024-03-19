<script setup>
import useCurrentPage from '~/composables/useCurrentPage';

    const announcements = useAnnouncements();

    const route = useRoute()
    const city = computed(() => route.query.city)
    const family = computed(() => route.query.family)
    const reset = computed(() => route.query.reset)

    const limit = 21;
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
    <Filters />
    <div v-if="!!error">
        <strong class="text-red-500">
            {{ error }}
        </strong>
    </div>
    <div v-else>
        <Paginator :limit/>
        <div v-if="pending">
            Loading...
        </div>
        <TransitionGroup v-else name="list" tag="ul" class="relative flex flex-wrap gap-16 items-center">
            <template v-for="announcement in announcements.announcements.pages[currentPage]" :key="announcement.id">
                <AnnouncementCard  :announcement/>
            </template>
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