<script setup>
    import { startFavTour } from '~/lib/tourguide';

    const favAnnouncements = useFavAnnouncements()

    const limit = 100;

    onMounted(async () => {
        await favAnnouncements.getLastFavAnnouncements({limit})
    })

    watchEffect(() => {
        if(favAnnouncements.favAnnouncements.total !== 0) {
            startFavTour()
        }
    })

    const onLoadMore = async () => {
        await favAnnouncements.getAllFavAnnouncements()
    }
</script>

<template>
    <div class="mt-8">
        <div v-if="!!favAnnouncements.favAnnouncements.total" class="space-y-4 text-center">
            <ul class="flex flex-col gap-4">
                <FavAnnouncementCard v-for="(announcement, index) in favAnnouncements.favAnnouncements.results" :announcement :key="announcement.id" :index/>
            </ul>
           <Button 
                class="!mt-12"
                v-if="favAnnouncements.favAnnouncements.total > limit && favAnnouncements.favAnnouncements.results.length <= limit" 
                @click="onLoadMore">
                    Charger toutes les annonces mises en favori
            </Button>
        </div>
        <div v-else class="text-center">
            Vous n'avez pas encore mis d'annonces en favori.
        </div>
    </div>
</template>