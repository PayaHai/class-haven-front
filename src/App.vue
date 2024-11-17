<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import {ref} from "vue"
const a = ref(import.meta.env.VITE_API_URL)
</script>

<template>
    <p>{{a}}</p>
</template>

<style scoped>
</style>
