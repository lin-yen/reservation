<script setup lang="ts">
interface Props {
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: '--',
});

console.log(props);
</script>

<script lang="ts">
export default {
  name: 'HotelPage',
};
</script>

<template lang="pug">
div(class="content") Hotel ID is {{ id }}.
</template>

<style lang="sass" scoped>
.content
  background-color: green
</style>
