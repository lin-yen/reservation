<script lang="ts">
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';

export default {
  setup() {
    const form = ref({
      adultCount: 0,
      checkInDate: null,
      checkOutDate: null,
      bedSize: null,
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
  },
};
</script>
