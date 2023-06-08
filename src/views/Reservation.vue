<script setup lang="ts">
// import ReservationForm from 'src/components/ReservationForm.vue';
// import PaymentModal from 'src/components/modals/PaymentModal.vue';
import type { ReservationBookingData } from 'src/models/i-reservation-booking-data';
import { computed, ref, watch, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Props {
  bookingData: ReservationBookingData;
}

const props = defineProps<Props>();
const invalidForms = ref([] as number[]); // List of invalid forms
const firstInvalidForm = ref(1); // Firt of the invalid forms
const showPaymentModal = ref(false);
const tabIndex = ref(0); // Currently active tab
const invalidFormCount = computed(() => {
  return invalidForms.value.length;
});
const formCount = computed(() => {
  return props.bookingData?.totalVisitorCount;
});

onBeforeMount(() => {
  if (!props.bookingData) {
    router.push('/');
  }
});

watch(invalidFormCount, (val) => {
  if (val < 1) {
    showPaymentModal.value = true;
  }
});

// Sets the currently active tab
const setTabIndex = () => {
  setTimeout(() => {
    tabIndex.value = firstInvalidForm.value - 1;
  }, 100);
};

// Creates a new set of invalid forms
const setInvalidForms = (i: number, $event) => {
  if ($event) {
    // if form is invalid
    invalidForms.value.push(i);
  } else {
    const index = invalidForms.value.indexOf(i);

    invalidForms.value.splice(index, 1);

    setTabIndex();
  }

  setFirstInvalidForm();
};

// Finds the firt invalid form
const setFirstInvalidForm = () => {
  if (invalidFormCount.value > 0) {
    // if there are invalid forms, get first
    firstInvalidForm.value = Math.min(...invalidForms.value);
  } else {
    // if there are no invalid forms set first to forms count
    firstInvalidForm.value = formCount.value;
  }
};

const getImageUrl = (name: string) => {
  const str = `../assets/img/hotels/${name}.jpg`;

  return new URL(str, import.meta.url).href;
};
</script>

<script lang="ts">
export default {
  name: 'ReservationPage',
};
</script>

<template lang="pug">
div(v-if="bookingData")
  b-row(align-v="start")
    b-col(lg="8" class="mb-3 mb-lg-0")
      b-card(no-body class="shadow")
        b-tabs(
          v-model="tabIndex"
          pills
          card)
          b-tab(
            v-for="i in formCount"
            :key="i"
            :title="`${i}. Visitor`"
            :disabled="i > firstInvalidForm"
            title-item-class="position-relative"
            :title-link-class="`tab-link tab-link--${invalidForms.includes(i) ? 'error' : 'success'}`")
            b-card-text
              //- ReservationForm(
              //-   :refer="`reservation-form-${i}`"
              //-   :show-next-btn="tabIndex !== formCount - 1"
              //-   :disable-payment-btn="invalidFormCount > 0"
              //-   :is-active="tabIndex === i - 1"
              //-   @is-invalid="setInvalidForms(i, $event)"
              //-   @next="tabIndex++")

    b-col(lg="4" class="sticky p-lg-0")
      b-card(class="shadow")
        h2 {{ bookingData.hotel.name }}

        b-img(
          class="rounded shadow-sm"
          fluid
          :src="getImageUrl(bookingData.hotel.img)")

        ul(class="reset-list mt-2")
          li
            b Check-In Date:
            | {{ $filters.parseDate(new Date(bookingData.checkInDate)) }}
          li
            b Check-Out Date:
            | {{ $filters.parseDate(new Date(bookingData.checkOutDate)) }}
          li
            b Visitors:
            | {{ `${bookingData.adultCount} Adults${bookingData.infantCount > 0 ? `, ${bookingData.infantCount} Infants` : ""}` }}
          li
            b Total Price:
            | {{ bookingData.totalPrice }}$

        b-button(
          v-b-modal.payment-modal
          variant="primary"
          :disabled="invalidFormCount > 0")
          | Proceed To Payment
          i(class="ml-1 fas fa-credit-card")

  //- PaymentModal(:visible="showPaymentModal")
</template>

<style lang="scss">
.tab-link {
  &::after {
    margin-left: 0.3rem;
    font-weight: 900;
    font-family: 'Font Awesome 5 Free';
    // position: absolute;
    // top: 0;
    // right: 0;
    // transform: translate(50%, -50%);
  }

  &--error::after {
    content: '\f057';
  }
  &--success::after {
    content: '\f058';
  }
}
</style>
