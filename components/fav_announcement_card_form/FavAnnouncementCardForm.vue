<script setup>
    import Multiselect from 'vue-multiselect';
    import { Textarea } from '@/components/ui/textarea'

    const props = defineProps(['announcementId'])
    const favAnnouncement = useFavAnnouncements()

    const formValues = reactive({
        type: "",
        interlocution: "",
        contact: "",
        description: ""
    })

    const types = ['Essai de contact', 'Interlocution'];

    const submitDisabled = computed(() => !formValues.type || !formValues.interlocution || !formValues.contact)

    const onSubmit = async (e) => {
        e.preventDefault()
        if(submitDisabled.value) {
            return;
        }

        await favAnnouncement.updateContactsFavAnnouncement(props.announcementId, toRaw(formValues))
    }
</script>

<template>
     <form class="space-y-4 w-full bg-white border border-gray-300 rounded-lg p-4" @submit="onSubmit">
        <div class="flex gap-2 items-center">
            <label class="block flex after:content-['*'] after:ml-0.5 after:text-red-500">
                Type
            </label>
            <Multiselect 
                v-model="formValues.type"
                :options="types" 
                placeholder="Choisir un type d'interaction" 
                :searchable="false"
            />
        </div>
        <div class="flex gap-2 items-center">
            <label class="block flex after:content-['*'] after:ml-0.5 after:text-red-500">
                Interlocuteur
            </label>
            <Input class="bg-white placeholder:text-gray-400" v-model="formValues.interlocution" placeholder="Nom de l'interlocuteur"/>
        </div>
        <div class="flex gap-2 items-center">
            <label class="block flex after:content-['*'] after:ml-0.5 after:text-red-500">
                Contact
            </label>
            <Input class="bg-white placeholder:text-gray-400" v-model="formValues.contact" placeholder="Email/Téléphone"/>
        </div>
        <div class="flex gap-2 items-center">
            <label>
                Description
            </label>
            <Textarea class="bg-white placeholder:text-gray-400" v-model="formValues.description" placeholder="Description de l'interaction..."/>
        </div>
        <div class="flex gap-4 justify-end items-center">
            <Button @click="$emit('cancel')" variant="secondary">
                Cancel
            </Button>
            <Button type="submit" :disabled="submitDisabled">
                Save
            </Button>
        </div>
    </form>
</template>