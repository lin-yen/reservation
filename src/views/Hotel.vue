<script setup lang="ts">
import VisitorCounter from 'src/components/VisitorCounter.vue';
import HotelCarousel from 'src/components/HotelCarousel.vue';
import MapModal from 'src/components/modals/MapModal.vue';
import HotelCardRating from 'src/components/HotelCardRating.vue';
import hotelsConf from 'src/assets/data/hotels';
import bedSizeIconsConf from 'src/assets/data/maps/bed-size-icons';
import facilityIconsConf from 'src/assets/data/maps/facility-icons';
import includedIconsConf from 'src/assets/data/maps/included-icons';
import { ref, computed, onBeforeMount } from 'vue';
import type { IHotelsItem } from 'src/models/i-hotels';
import { useRouter } from 'vue-router';
import { useBookingValidation } from 'src/mixins/validation/booking-validation';
import { useValidateState } from 'src/mixins/validation/validate-state';

const router = useRouter();
const { form, v$ } = useBookingValidation();
const { validateState } = useValidateState(v$);

interface Props {
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: '--',
});

const hotels = ref(hotelsConf);
const bedSizeIcons = ref(bedSizeIconsConf);
const facilityIcons = ref(facilityIconsConf);
const includedIcons = ref(includedIconsConf);
const hotel = ref({} as IHotelsItem | undefined);
const hotelDesc = ref([] as string[]);
const totalVisitorCount = computed(() => {
  return form.value.adultCount + form.value.infantCount;
});
const totalPrice = computed(() => {
  if (!hotel.value) {
    return 0;
  }

  return (
    form.value.adultCount *
    (hotel.value.pricing.bed[form.value.bedSize || 'normal'] +
      (form.value.included
        ? hotel.value.pricing.included[form.value.included] || 0
        : 0))
  );
});

onBeforeMount(() => {
  hotel.value = hotels.value.find((hotel) => hotel.id === Number(props.id));

  if (hotel.value) {
    hotelDesc.value = hotel.value.desc.split('\n'); // split hotel description by new lines for making paragraphs
  }
});

const setVisitorCount = (type: string, $event) => {
  if (type === 'adult') {
    form.value.adultCount = $event;
  } else if (type === 'infant') {
    form.value.infantCount = $event;
  }
};

const book = () => {
  v$.value.$touch();

  if (!v$.value.$error) {
    router.push({
      name: 'Reservation',
      params: {
        formAdultCount: form.value.adultCount,
        formInfantCount: form.value.infantCount,
        formCheckInDate: form.value.checkInDate?.toString(),
        formCheckOutDate: form.value.checkOutDate?.toString(),
        formBedSize: form.value.bedSize,
        formincluded: form.value.included,
        totalVisitorCount: totalVisitorCount.value,
        totalPrice: totalPrice.value,
        hotelImg: hotel.value?.img,
        hotelName: hotel.value?.name,
      },
    });
  }
};

const formMagic = () => {
  const date = new Date();

  form.value.adultCount = 2;
  form.value.infantCount = 1;
  form.value.checkInDate = new Date();
  form.value.checkOutDate = new Date(date.setDate(date.getDate() + 3));
  form.value.bedSize = 'king';
  form.value.included = 'all-in';
};
</script>

<script lang="ts">
export default {
  name: 'HotelPage',
};
</script>

<template lang="pug">
div(v-if="hotel")
  b-row(align-v="start")
    b-col(lg="8" class="mb-3 mb-lg-0")
      b-card(class="shadow")
        h1(class="mb-3") {{ hotel?.name }}
        HotelCarousel(:showcase-img="hotel?.img")

        hr

        section
          div(class="d-flex flex-wrap align-items-center mb-2")
            i(class="fas fa-map-marker-alt mr-2 text-primary")
            span(class="text-muted") {{ hotel?.location.city }}
            span(class="mx-2") &#8226;
            b-button(
              v-b-modal.map-modal
              class="p-0"
              variant="link") Show On Map
            span(class="mx-2") &#8226;
            span {{ hotel?.location.distance_from_center }} km from center
            span(v-if="hotel?.location.subway_access")
              span(class="mx-2") &#8226;
              span Subway Access

            HotelCardRating(
              :id="hotel?.id"
              :rating="hotel?.rating"
              class="flex-1 text-right")
          div
            i(class="fas fa-hotel mr-2 text-primary")
            | {{ hotel?.location.addr }},
            | {{ hotel?.location.city }},
            | {{ hotel?.location.country }}

        hr

        div(class="mt-4")
          p(
            v-for="desc, i in hotelDesc"
            :key="i") {{ desc }}

        hr

        div(class="d-flex flex-wrap gap-1 mb-3 flex-1")
          div(
            v-for="facility, i in hotel?.facilities"
            :key="i")
            i(
              class="mr-1 text-primary"
              :class="facilityIcons[facility]")
            span(class="text-muted") {{ $filters.capitalize(facility) }}

    b-col(lg="4" class="sticky p-lg-0")
      b-card(class="shadow")
        div(class="d-flex justify-content-between align-items-end flex-wrap")
          h2(class="mb-0") Book Now
          span(v-if="totalPrice > 0") Total: {{ totalPrice }} $
        hr
        b-form
          b-form-group(label="Check-In Date" label-class="font-weight-bold")
            b-form-datepicker(
              v-model="form.checkInDate"
              placeholder="Choose a check-in date"
              locale="en"
              no-flip
              :state="validateState('form.checkInDate')")
            b-form-invalid-feedback Choose a check-in date
          b-form-group(label="Check-Out Date" label-class="font-weight-bold")
            b-form-datepicker(
              v-model="form.checkOutDate"
              placeholder="Choose a check-out date"
              locale="en"
              no-flip
              :state="validateState('form.checkOutDate')")
            b-form-invalid-feedback Choose check-out date

          b-form-group(label="Visitors" label-class="font-weight-bold")
            b-dropdown(
              :text="totalVisitorCount > 0 ? `Adults: ${form.adultCount}${form.infantCount > 0 ? `, Infants: ${form.infantCount}` : ''}` : 'Choose the number of visitors'"
              block
              :toggle-class="`custom-dropdown-toggle ${v$.form.adultCount.$error && v$.form.adultCount.$dirty ? 'custom-dropdown-toggle--error' : ''} d-flex justify-content-between align-items-center`"
              menu-class="w-100")
              div(class="d-flex flex-wrap justify-content-between align-items-center px-3")
                div(class="text-center")
                  b Adult
                  VisitorCounter(:visitor-count="form.adultCount" @change="setVisitorCount('adult', $event)")
                span(class="text-muted") |
                div(class="text-center")
                  b Infant
                  VisitorCounter(:visitor-count="form.infantCount" @change="setVisitorCount('infant', $event)")
            small(v-if="v$.form.adultCount.$error && v$.form.adultCount.$dirty" class="text-danger") Choose the number of adult visitors

          b-form-group(label="Bed Size" label-class="font-weight-bold")
            div(class="d-flex flex-wrap gap-0h")
              div(
                v-for="bedSize, i in hotel?.bed_sizes"
                :key="i"
                class="custom-radio")
                input(
                  :id="`${bedSize}-bed`"
                  v-model="v$.form.bedSize.$model"
                  type="radio"
                  name="bed_size"
                  class="custom-radio__radio"
                  :value="bedSize")
                label(class="custom-radio__label d-flex flex-column align-items-center gap-0h" :for="`${bedSize}-bed`")
                  i(
                    class="custom-radio__icon font-1h"
                    :class="bedSizeIcons[bedSize]")
                  | {{ $filters.capitalize(bedSize) }} Size
            small(v-if="v$.form.bedSize.$error && v$.form.bedSize.$dirty" class="text-danger") Choose a bed size

          b-form-group(label="Included" label-class="font-weight-bold")
            div(class="d-flex flex-wrap gap-0h")
              div(
                v-for="included, i in hotel?.included"
                :key="i"
                class="custom-radio")
                input(
                  :id="`${included}`"
                  v-model="form.included"
                  type="radio"
                  name="included"
                  class="custom-radio__radio"
                  :value="included")
                label(class="custom-radio__label d-flex flex-column align-items-center gap-0h" :for="`${included}`")
                  i(
                    class="custom-radio__icon font-1h"
                    :class="includedIcons[included]")
                  | {{ $filters.capitalize(included) }}

          div(class="d-flex justify-content-between")
            b-button(
              variant="primary"
              @click="book()") Book Now

            b-button(
              v-b-tooltip.hover
              class="font-1h"
              variant="link"
              title="Auto Fill"
              @click="formMagic()")
              i(class="fas fa-hat-wizard")

  MapModal(:coordinates="hotel?.location.coordinates")
</template>

<style lang="scss">
.custom-dropdown-toggle {
  border: 1px solid #ced4da;
  background-color: white !important;
  color: #6c757d !important;

  &:hover {
    border-color: #ced4da;
  }

  &--error {
    border-color: #dc3545;
    &:hover {
      border-color: #dc3545;
    }
  }
}
</style>
