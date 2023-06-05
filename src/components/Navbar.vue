<template lang="pug">
b-navbar(toggleable="md" type="dark" variant="dark" class="mb-5")
  b-container
    b-navbar-brand(href="/") CoolName

    b-navbar-toggle(target="nav-collapse")

    b-collapse(id="nav-collapse" is-nav)
      b-navbar-nav(class="ml-auto")
        b-nav-form(@submit.prevent="filter.locationSearch = location")
          b-form-input(
            v-model="location"
            size="sm"
            class="mr-sm-2"
            placeholder="Search by location")

          b-button(size="sm" class="my-2 my-sm-0" type="submit" variant="primary")
            i(class="fas fa-search")

        //- filter
        b-nav-item-dropdown(right no-caret)
          template(#button-content)
            b-button(size="sm" class="ml-3" variant="primary")
              | Filter
              i(class="fas fa-filter")


          b-dropdown-form
            b-dropdown-header Filter Facilities
            b-form-checkbox-group(
              v-model="filter.selectedFacilities"
              :options="facilityOptions"
              name="facility"
              stacked)
</template>

<script setup lang="ts">
import facilities from 'src/assets/data/maps/facility-icons';
import { onBeforeMount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const facilityOptions = ref(
  [] as {
    html: string;
    value: string;
  }[]
);
const location = ref('');
const filter = ref({
  selectedFacilities: [],
  locationSearch: '',
});
const query = ref({
  facilities: '',
  location: '',
});

onBeforeMount(() => {
  Object.keys(facilities).forEach((facility) => {
    facilityOptions.value.push({
      html: facility,
      value: facility,
    });
  });
});

// watch works directly on a ref
watch(
  filter,
  async (newQuestion) => {
    query.value.facilities =
      newQuestion.selectedFacilities.length > 0
        ? newQuestion.selectedFacilities.join(',')
        : '';

    query.value.location =
      newQuestion.locationSearch !== '' ? newQuestion.locationSearch : '';

    router.push({
      path: '/',
      query: query.value,
    });
  },
  { deep: true }
);
</script>

<script lang="ts">
export default {
  name: 'NavbarPage',
};
</script>
<style></style>
