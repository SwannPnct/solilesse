<script setup>
    import { StarIcon } from '@radix-icons/vue';

    const deletedAnnouncements = useDeletedAnnouncements()
    const props = defineProps(['announcement', 'index']);
    const {name} = useComputedAnnouncement(props.announcement)

    const onItemFav = async (e) => {
        e.stopPropagation();
        await deletedAnnouncements.favAnnouncement(props.announcement)
    }
</script>

<template>
    <li>
        <Card class="bg-gray-100">
        <CardContent class="flex justify-between items-center p-6">
                <CardTitle class="text-lg">{{ name }}</CardTitle>
                <CardDescription>{{ announcement.id }}</CardDescription>
                <div>{{ announcement.dateparution }}</div>
                <div>{{ announcement.ville }}</div>
                <div>{{ announcement.familleavis_lib }}</div>
                <div :id="index === 0 ? 'tour-deleted-1' : undefined">
                    <Button @click="onItemFav" variant="outline" title="Ajouter aux favories" class="border-green-500 text-green-500 hover:bg-green-100 hover:text-green-600">
                        <StarIcon />
                    </Button>
                </div>
            </CardContent>
        </Card>
    </li>
</template>