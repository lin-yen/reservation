<script lang="ts">
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength } from '@vuelidate/validators';

export default {
  setup() {
    const form = ref({
      name: null,
      cardNumber: null,
      ccv: null,
      validThru: {
        month: null,
        year: null,
      },
    });
    const requireCardNumberLength = ref(16);
    const requireCCVLength = ref(3);
    const rules = computed(() => ({
      form: {
        name: {
          required,
        },
        cardNumber: {
          required,
          maxLength: maxLength(requireCardNumberLength.value),
          minLength: minLength(requireCardNumberLength.value),
        },
        ccv: {
          required,
          maxLength: maxLength(requireCCVLength.value),
          minLength: minLength(requireCCVLength.value),
        },
        validThru: {
          month: {
            required,
          },
          year: {
            required,
          },
        },
      },
    }));

    const v$ = useVuelidate(rules, { form });

    return { form, requireCardNumberLength, requireCCVLength, v$ };
  },
};
</script>
