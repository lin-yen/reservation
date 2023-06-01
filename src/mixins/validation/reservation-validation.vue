<script lang="ts">
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import {
  required,
  email,
  minValue,
  minLength,
  maxLength,
} from '@vuelidate/validators';
import { hesCode, validPhone } from 'src/helpers/validation-rules';

export default {
  setup() {
    const form = ref({
      name: null,
      email: null,
      age: null,
      hes_code: null,
      tc: null,
      phone: null,
      sex: null,
    });
    const requireAgeLength = ref(6);
    const requireTCLength = ref(11);
    const rules = computed(() => ({
      form: {
        name: {
          required,
        },
        email: {
          required,
          email,
        },
        age: {
          required,
          minValue: minValue(requireAgeLength.value),
        },
        hes_code: {
          required,
          hesCode,
        },
        tc: {
          required,
          minLength: minLength(requireTCLength.value),
          maxLength: maxLength(requireTCLength.value),
        },
        phone: {
          required,
          validPhone,
        },
        sex: {
          required,
        },
      },
    }));

    const v$ = useVuelidate(rules, { form });

    return { form, requireAgeLength, requireTCLength, v$ };
  },
};
</script>
