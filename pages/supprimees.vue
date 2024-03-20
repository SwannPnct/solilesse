<script setup>
    const deletedAnnouncements = useDeletedAnnouncements();

    const limit = 5;

    onMounted(async () => {
        await deletedAnnouncements.getLastDeletedAnnouncements({limit})
    })

    const onLoadMore = async () => {
        await deletedAnnouncements.getAllDeletedAnnouncements()
    }
</script>

<template>
    <div class="mt-8">
        <div v-if="!!deletedAnnouncements.deletedAnnouncements.total" class="space-y-4 text-center">
            <DeletedAnnouncementCard v-for="announcement in deletedAnnouncements.deletedAnnouncements.results" :announcement/>
            <Button 
                class="!mt-12"
                v-if="deletedAnnouncements.deletedAnnouncements.total > limit && deletedAnnouncements.deletedAnnouncements.results.length <= limit" 
                @click="onLoadMore">
                    Charger toutes les annonces supprimées
            </Button>
        </div>
        <div v-else class="text-center">
            Vous n'avez pas encore supprimé d'annonces.
        </div>
    </div>
</template>