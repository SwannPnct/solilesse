<script setup>
    import { PlusIcon } from '@radix-icons/vue'

    const props = defineProps(['announcement']);
    const { address, name, activity, actors } = useComputedAnnouncement(props.announcement)

    const showContactForm = ref(false)

    const onUpdateOpen = (isOpen) => {
        if(!isOpen && showContactForm.value) showContactForm.value = false
    }
</script>

<template>
    <Dialog @update:open="onUpdateOpen">
        <DialogTrigger class="cursor-pointer ring-offset-2 ring-blue-200 rounded-xl focus:ring">
            <li>
                <Card class="hover:shadow-md">
                    <CardContent class="flex justify-between items-center p-6 gap-2">
                        <CardTitle class="text-lg">{{ name }}</CardTitle>
                        <CardDescription>{{ announcement.id }}</CardDescription>
                        <div>{{ announcement.dateparution }}</div>
                        <div>{{ announcement.ville }}</div>
                        <div>{{ announcement.familleavis_lib }}</div>
                    </CardContent>
                    <CardContent class="flex items-center justify-center p-6 gap-4">
                        <h4 class="text-lg font-semibold">Status:</h4>
                        <div>bla bla</div>
                    </CardContent>
                </Card>
            </li>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle class="text-2xl">{{ name }}</DialogTitle>
                <DialogDescription>
                    {{ announcement.id }}
                </DialogDescription>
            </DialogHeader>
            <div class="overflow-y-auto">
                <div class="[&_span]:font-semibold border border-gray-300 p-3 rounded-lg">
                    <h4 class="font-semibold text-lg mb-3">Détails</h4>
                    <p><span>Date de parution:</span> {{ announcement.dateparution }}</p>
                    <p><span>Ville:</span> {{  announcement.ville }}</p>
                    <p><span>Famille:</span> {{ announcement.familleavis_lib }}</p>
                    <p><span>Activité:</span> {{ activity }}</p>
                    <p v-if="!!address"><span>Adresse:</span> {{ address }}</p>
                    <p v-if="!!actors"><span>Acteurs:</span> {{ actors }}</p>
                </div>
                <div class="bg-gray-100 mt-4 p-3 pb-6 rounded-lg border border-gray-300 flex flex-col items-center gap-6">
                    <div class="flex gap-4 items-center self-start">
                        <h4 class="font-semibold text-lg">Interactions</h4>
                        <Button class="rounded-full px-2" @click="showContactForm = true" :disabled="showContactForm">
                            <PlusIcon class="size-5" />
                        </Button>
                    </div>
                    <FavAnnouncementCardForm v-if="showContactForm" @cancel="showContactForm = false" :announcement-id="announcement.id"/>
                    <div v-if="!announcement.contacts?.length && !showContactForm">
                        Pas d'interactions.
                    </div>
                    <ul v-else class="space-y-4 w-full">
                        <li v-for="(contact, index) in announcement.contacts" :key="index" class="block space-y-4 w-full bg-white border border-gray-300 rounded-lg p-4">
                            {{ contact.type }}
                        </li>
                    </ul>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>