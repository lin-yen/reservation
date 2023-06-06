<script setup lang="ts">
import { watch } from 'vue';
import { ref } from 'vue';

interface Props {
  visitorCount: number;
}

const emit = defineEmits<{ (e: 'change', val: number) }>();
const props = withDefaults(defineProps<Props>(), {
  visitorCount: 0,
});
const count = ref(0);

watch(count, (val) => {
  emit('change', val);
});

watch(
  () => props.visitorCount,
  (newQuestion) => {
    count.value = newQuestion;
  }
);

const increase = () => {
  if (count.value < 15) {
    count.value++;
  }
};

const descrease = () => {
  if (count.value > 0) {
    count.value--;
  }
};
</script>

<script lang="ts">
export default {
  name: 'VisitorCounter',
};
</script>

<template lang="pug">
section(class="counter d-flex align-items-center")
  b-button(
    variant="link"
    size="sm"
    @click="descrease()")
    i(class="fas fa-minus")
  div(class="counter__count") {{ count }}
  b-button(
    variant="link"
    size="sm"
    @click="increase()")
    i(class="fas fa-plus")
</template>

<style lang="scss" scoped>
.counter {
  &__count {
    text-align: center;
    font-size: 1rem;
    width: 1.5em;
  }
}
</style>
