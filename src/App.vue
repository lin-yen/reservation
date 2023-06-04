<script setup lang="ts">
import Navbar from 'src/components/Navbar.vue';
</script>

<script lang="ts">
export default {
  name: 'App',
};
</script>

<template lang="pug">
div(id="app" class="app")
  Navbar

  b-container
    router-view
</template>

<style></style>
