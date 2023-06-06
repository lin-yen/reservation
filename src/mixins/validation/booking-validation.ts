import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';

export function useBookingValidation() {
  const form = ref({
    adultCount: 0,
    infantCount: 0,
    checkInDate: null,
    checkOutDate: null,
    bedSize: null,
    included: null,
  } as {
    adultCount: number;
    infantCount: number;
    checkInDate: Date | null;
    checkOutDate: Date | null;
    bedSize: string | null;
    included: string | null;
  });
  const requireFormAdultCountLength = ref(1);
  const rules = computed(() => ({
    form: {
      adultCount: {
        minValue: minValue(requireFormAdultCountLength.value),
      },
      checkInDate: {
        required,
      },
      checkOutDate: {
        required,
      },
      bedSize: {
        required,
      },
    },
  }));

  const v$ = useVuelidate(rules, { form });

  return { form, requireFormAdultCountLength, v$ };
}
