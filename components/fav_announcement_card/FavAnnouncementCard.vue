<script setup>
    import {  } from '@radix-icons/vue';
    import { CircleUserRound } from 'lucide-vue-next';

    const props = defineProps(['announcement']);

    const clicked = ref(false)
    const li = ref(null)

    const { address, name, activity, actors } = useComputedAnnouncement(props.announcement)

    onMounted(() => {
        document.addEventListener('click', (e) => {
            if(!li.value?.contains(e.target) && clicked.value) {
                clicked.value = false;
            }
        })
    })

    const onItemClick = () => {
        clicked.value = !clicked.value
    }
</script>

<template>
    <li ref="li" :class="`cursor-pointer ring-offset-2 ring-blue-200 rounded-xl ${clicked ? 'ring' : ''}`" @click="onItemClick">
        <Card>
            <CardContent class="flex justify-between items-center p-6">
                <CardTitle class="text-lg">{{ name }}</CardTitle>
                <CardDescription>{{ announcement.id }}</CardDescription>
                <div>{{ announcement.dateparution }}</div>
                <div>{{ announcement.ville }}</div>
                <div>{{ announcement.familleavis_lib }}</div>
            </CardContent>
            <CardContent class="flex items-center p-6">
                <CircleUserRound stroke-width="1"/>
            </CardContent>
        </Card>
    </li>
</template>