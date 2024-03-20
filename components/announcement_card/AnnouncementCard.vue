<script setup>
    import { TrashIcon } from '@radix-icons/vue'

    const announcements = useAnnouncements()
   const props = defineProps(['announcement']);

   const clicked = ref(false)
   const li = ref(null)

   const establishment = computed(() => JSON.parse(props.announcement.listeetablissements))

   onMounted(() => {
    document.addEventListener('click', (e) => {
        if(!li.value?.contains(e.target) && clicked.value) {
            clicked.value = false;
        }
    })
   })

   const onItemClick = () => {
    if(!clicked.value) {
        clicked.value = true
        li.value.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    };
   }

   const onItemDelete = async (e) => {
    e.stopPropagation();
    await announcements.deleteAccouncement(props.announcement)
   }

   const buildAddress = (adressObj) => {
    return Object.values(adressObj).join(' ')
   }
</script>

<template>
    <li ref="li" :class="'self-start w-[350px] h-fit'" @click="onItemClick">
        <Card class="size-full transition-all hover:shadow-lg cursor-pointer overflow-hidden">
            <CardHeader>
                <CardTitle class="text-lg">{{ announcement.commercant }}</CardTitle>
                <CardDescription>{{ announcement.id }}</CardDescription>
            </CardHeader>
            <CardContent class="announcement__card-content">
                <p><span>Date de parution:</span> {{ announcement.dateparution }}</p>
                <p><span>Ville:</span> {{  announcement.ville }}</p>
                <p><span>Famille:</span> {{ announcement.familleavis_lib }}</p>
                <p :class="clicked ? 'line-clamp-none' : 'line-clamp-4'"><span>Activité:</span> {{ establishment.etablissement.activite }}</p>


                <div v-show="clicked" class="mt-4">
                    <p><span>Type:</span> {{ announcement.typeavis_lib }}</p>
                    <p v-if="!!establishment.etablissement.adresse"><span>Adresse:</span> {{ buildAddress(establishment.etablissement.adresse) }}</p>
                </div>
            </CardContent>
            <CardFooter class="justify-end">
                <Button @click="onItemDelete" variant="outline" title="Supprimer" class="border-red-500 text-red-500 hover:bg-red-100 hover:text-red-600">
                    <TrashIcon />
                </Button>
            </CardFooter>
        </Card>
    </li>
</template>

<style scoped>
    .announcement__card-content p span {
        @apply font-semibold;
    }
</style>