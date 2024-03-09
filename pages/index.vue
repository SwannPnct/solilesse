<script setup>
    const {data: announcements, pending, error} = await useFetch('/api/announcements', {
        lazy: true
    })
</script>

<template>
    <div v-if="pending">loading...</div>
    <div v-else-if="!!error">
        <strong class="text-red-500">Erreur.</strong>
    </div>
    <ul v-else>
        <li v-for="announcement in announcements.results">
            {{ announcement.id }}
        </li>
    </ul>
</template>