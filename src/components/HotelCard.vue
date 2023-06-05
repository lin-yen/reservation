<script setup lang="ts">
import HotelCardRating from 'src/components/HotelCardRating.vue';
import facilityIconsConf from 'src/assets/data/maps/facility-icons';
import type { IHotelsItem } from 'src/models/i-hotels';
import { computed, ref } from 'vue';

interface Props {
  hotel: IHotelsItem;
}

const props = withDefaults(defineProps<Props>(), {
  hotel: undefined,
});

defineEmits(['show-on-map']);

const isFavorite = ref(false);
const facilityIcons = ref(facilityIconsConf);
const minPrice = computed(() => {
  return Math.min(...Object.values(props.hotel.pricing.bed));
});
const img = ref('');

import(`src/assets/img/hotels/${props.hotel.img}.jpg`).then((value) => {
  img.value = value.default;
});
</script>

<script lang="ts">
export default {
  name: 'HotelCard',
};
</script>

<template lang="pug">
b-card(
  no-body
  class="hotel-card shadow-sm")

  b-row(no-gutters)

    b-col(
      md="4"
      lg="3"
      class="p-2")
      b-card-img(
        :src="img"
        class="hotel-card__img")
      b-button(
        class="like-btn text-danger"
        variant="dark"
        @click="isFavorite = !isFavorite")
        i(:class="`${isFavorite ? 'fas' : 'far'} fa-heart`")

    b-col(md="8" lg="9")
      b-card-body(class="d-flex flex-column h-100")
        div(class="d-flex justify-content-between align-items-center")
          h4(class="card-title") {{ props.hotel.name }}
          HotelCardRating(
            :id="props.hotel.id"
            :rating="props.hotel.rating")
        div(class="d-flex flex-wrap align-items-center mb-2")
          i(class="fas fa-map-marker-alt mr-2 text-primary")
          span(class="text-muted") {{ props.hotel.location.city }}
          span(class="mx-2") &#8226;
          b-button(
            v-b-modal.map-modal
            class="p-0"
            variant="link"
            @click="$emit('show-on-map', props.hotel.location.coordinates)") Show On Map
          span(class="mx-2") &#8226;
          span {{ props.hotel.location.distance_from_center }} km from center
          span(v-if="props.hotel.location.subway_access")
            span(class="mx-2") &#8226;
            span Subway Access
        //- b-card-text Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, iure!

        div(class="d-flex flex-wrap gap-1 mb-3 flex-1")
          div(
            v-for="facility, i in props.hotel.facilities"
            :key="i")
            i(
              class="mr-1 text-primary"
              :class="facilityIcons[facility]")
            span(class="text-muted") {{ $filters.capitalize(facility) }}

        hr(class="w-100")

        div(class="d-flex justify-content-between align-items-center")
          span(class="font-1h") Starts from {{ minPrice }}$
          b-button(:to="`/hotel/${props.hotel.id}`" variant="primary") Book Now
</template>
