<script setup>
    import { QuestionMarkIcon } from '@radix-icons/vue'
    import { startDeletedTour, startFavTour, startHomeTour } from '~/lib/tourguide';

    const props = defineProps(['group'])

    const onClick = () => {
        switch (props.group) {
            case 'home':
                startHomeTour({force: true})
                break;
            case 'deleted':
                startDeletedTour({force: true})
                break;
            case 'fav':
                startFavTour({force: true})
                break;
            default:
                break;
        }
    }
</script>

<template>
    <Button title="Voir le tutoriel" class="px-2 rounded-full border-gray-500 text-gray-500 hover:bg-gray-100 hover:text-gray-600" variant="outline" @click="onClick">
        <QuestionMarkIcon />
    </Button>
</template>