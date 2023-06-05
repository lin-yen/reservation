<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import HotelCard from 'src/components/HotelCard.vue';
import MapModal from 'src/components/modals/MapModal.vue';
import hotelsConf from 'src/assets/data/hotels.js';
import type {
  IHotelsItem,
  IHotelsItemLocationCoordinates,
} from 'src/models/i-hotels';
import { useRoute } from 'vue-router';

const route = useRoute();

const hotels = ref(hotelsConf);
const filteredHotels = ref([] as IHotelsItem[]);
const locationSearch = ref('');
const isFiltering = ref(false);
const coordinates = ref({
  lat: '',
  long: '',
} as IHotelsItemLocationCoordinates);

const filter = () => {
  let newHotels = hotels.value;

  const to = route;

  filteredHotels.value = [];

  isFiltering.value = false;

  // if searched by location set hotels and filtered hotels with result
  if (to.query.location) {
    isFiltering.value = true;
    locationSearch.value = to.query.location as string;
    newHotels = hotels.value.filter(
      (hotel) =>
        hotel.location.city.toLowerCase() ===
          locationSearch.value.toLowerCase() ||
        hotel.location.country.toLowerCase() ===
          locationSearch.value.toLowerCase()
    );
    filteredHotels.value = newHotels;
  }

  // if filtered by facility set filtered hotels with result
  if (to.query.facilities) {
    isFiltering.value = true;

    const filters = (to.query.facilities as string).split(',');

    filteredHotels.value = newHotels.filter((hotel) =>
      filters.every((facility) => hotel.facilities.includes(facility))
    );
  }
};

const showOnMap = (coordinatesData: IHotelsItemLocationCoordinates) => {
  coordinates.value = coordinatesData;
};

onBeforeMount(() => {
  filter();
});

watch(route, () => {
  filter();
});
</script>

<script lang="ts">
export default {
  name: 'HotelsSection',
};
</script>

<template lang="pug">
section
  div(v-if="isFiltering && filteredHotels.length === 0")
    p Aradığınız kriterlerde bir hotel bulunamadı.

  div(v-else)
    HotelCard(
      v-for="hotel, i in (filteredHotels.length > 0 ? filteredHotels : hotels)"
      :key="i"
      :hotel="hotel"
      class="mb-3"
      @show-on-map="showOnMap")

  MapModal(:coordinates="coordinates")
</template>
