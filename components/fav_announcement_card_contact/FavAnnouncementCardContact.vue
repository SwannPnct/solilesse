<script setup>
    import { TrashIcon } from '@radix-icons/vue'

    const props = defineProps(["contact", "index", "announcement"]);
    const favAnnouncements = useFavAnnouncements()

    const onDelete = async () => {
        await favAnnouncements.removeContactsFavAnnouncement(props.announcement.id, props.index)
    }

    const date = computed(() => new Intl.DateTimeFormat('fr-FR', {
        dateStyle: "medium",
        timeStyle: "medium"
    }).format(props.contact.date) )
</script>

<template>
    <li class="block flex w-full bg-white border border-gray-300 rounded-lg p-4 justify-between">
        <div class="space-y-4">
            <p class="space-x-2">
                <strong
                
                >
                    Date
                </strong>
                <span> {{ date }}</span>
            </p>
            <p class="space-x-2">
                <strong
                
                >
                    Type
                </strong>
                <span> {{ contact.type }}</span>
            </p>
            <p class="space-x-2">
                <strong
                
                >
                Interlocuteur
                </strong>
                <span> {{ contact.interlocutor }}</span>
            </p>
            <p class="space-x-2">
                <strong
                
                >
                    Contact
                </strong>
                <span> {{ contact.contact }}</span>
            </p>
            <p class="space-x-2">
                <strong
                
                >
                    Description
                </strong>
                <span> {{ contact.description }}</span>
            </p>
        </div>
        <div>
            <Button @click="onDelete" variant="outline" title="Supprimer" class="border-red-500 text-red-500 hover:bg-red-100 hover:text-red-600">
                <TrashIcon />
            </Button>
        </div>
    </li>
</template>