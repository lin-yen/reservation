<script setup lang="ts">
import type { IHotelsItemLocationCoordinates } from 'src/models/i-hotels';

interface Props {
  coordinates: IHotelsItemLocationCoordinates;
}

const props = withDefaults(defineProps<Props>(), {
  coordinates: undefined,
});
</script>

<script lang="ts">
export default {
  name: 'MapModal',
};
</script>

<template lang="pug">
b-modal(
  id="map-modal"
  title="BootstrapVue"
  size="xl"
  hide-header
  hide-footer)
  b-embed(
    type="iframe"
    aspect="16by9"
    :src="`https://maps.google.com/maps?q=${props.coordinates.lat},${props.coordinates.long}&hl=en&z=18&amp;output=embed`"
    allowfullscreen)
</template>
