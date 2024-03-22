<script setup>
    const favAnnouncements = useFavAnnouncements()

    const limit = 100;

    onMounted(async () => {
        await favAnnouncements.getLastFavAnnouncements({limit})
    })

    const onLoadMore = async () => {
        await favAnnouncements.getAllFavAnnouncements()
    }
</script>

<template>
    <div class="mt-8">
        <div v-if="!!favAnnouncements.favAnnouncements.total" class="space-y-4 text-center">
           {{ favAnnouncements.favAnnouncements }}
        </div>
        <div v-else class="text-center">
            Vous n'avez pas encore mis d'annonces en favori.
        </div>
    </div>
</template>