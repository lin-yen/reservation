<script lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { getPropByPath } from 'src/helpers/object-helpers';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  methods: {
    validateState(name: string) {
      // NOTE: if there are no vuealidate model, return
      if (!getPropByPath(this.v$, name)) {
        return true;
      }

      const { $dirty, $error } = getPropByPath(this.v$, name);

      return $dirty ? !$error : null; // if form is touched return error state
    },
  },
};
</script>
