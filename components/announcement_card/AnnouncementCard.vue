<script setup>
    import { TrashIcon, StarIcon, CaretDownIcon, CaretUpIcon } from '@radix-icons/vue'
    import useComputedAnnouncement from '~/composables/useComputedAnnouncement';

    const announcements = useAnnouncements()
    const props = defineProps(['announcement']);

    const li = ref(null)

    const { address, name, activity, actors } = useComputedAnnouncement(props.announcement)

    const onItemClick = () => {
        li.value.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    }

    const onItemDelete = async (e) => {
        e.stopPropagation();
        await announcements.deleteAccouncement(props.announcement)
    }

    const onItemFav = async (e) => {
        e.stopPropagation();
        await announcements.favAnnouncement(props.announcement)
    }
</script>

<template>
    <li tabindex="0" ref="li" class="group self-start w-[350px] h-fit rounded-xl ring-blue-200 ring-offset-2 focus:ring" @click="onItemClick">
        <Card :class="`size-full transition-all hover:shadow-lg group-focus:shadow-none cursor-pointer overflow-hidden`">
            <CardHeader>
                <CardTitle class="text-lg">{{ name }}</CardTitle>
                <CardDescription>{{ announcement.id }}</CardDescription>
            </CardHeader>
            <CardContent class="announcement__card-content">
                <p><span>Date de parution:</span> {{ announcement.dateparution }}</p>
                <p><span>Ville:</span> {{  announcement.ville }}</p>
                <p><span>Famille:</span> {{ announcement.familleavis_lib }}</p>
                <p class="line-clamp-4 group-focus:line-clamp-none"><span>Activité:</span> {{ activity }}</p>

                <div class="mt-4 hidden group-focus:block">
                    <p><span>Type:</span> {{ announcement.typeavis_lib }}</p>
                    <p v-if="!!address"><span>Adresse:</span> {{ address }}</p>
                    <p v-if="!!actors"><span>Acteurs:</span> {{ actors }}</p>
                </div>
            </CardContent>
            <CardFooter class="flex flex-col gap-4">
                <div class="w-full flex justify-end gap-4">
                    <Button @click="onItemDelete" variant="outline" title="Supprimer" class="border-red-500 text-red-500 hover:bg-red-100 hover:text-red-600">
                        <TrashIcon />
                    </Button>
                    <Button @click="onItemFav" variant="outline" title="Ajouter aux favories" class="border-green-500 text-green-500 hover:bg-green-100 hover:text-green-600">
                        <StarIcon />
                    </Button>
                </div>
                <div class="w-full flex justify-center">
                    <CaretUpIcon class="size-6 hidden group-focus:block"/>
                    <CaretDownIcon class="size-6 group-focus:hidden"/>
                </div>
            </CardFooter>
        </Card>
    </li>
</template>

<style scoped>
    .announcement__card-content p span {
        @apply font-semibold;
    }
</style>