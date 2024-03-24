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
        <div v-if="!!deletedAnnouncements.deletedAnnouncements.total" class="text-center">
            <TransitionGroup name="list" tag="ul" class="flex flex-col gap-4 relative">
                <DeletedAnnouncementCard v-for="announcement in deletedAnnouncements.deletedAnnouncements.results" :announcement  :key="announcement.id" />
            </TransitionGroup>
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

<style>
    .list-move,
    .list-leave-active {
        transition: all 0.5s ease;
    }
    
    .list-leave-to {
        opacity: 0;
        transform: translateY(-200px);
    }

    .list-leave-active {
        position: absolute;
    }
</style>