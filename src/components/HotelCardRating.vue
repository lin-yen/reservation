<script setup lang="ts">
import type { IHotelsItemRating } from 'src/models/i-hotels';
import { computed } from 'vue';

interface Props {
  id: number;
  rating: IHotelsItemRating;
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  rating: undefined,
});

const avgRating = computed(() => {
  return Object.values(props.rating).reduce((prev, curr) => prev + curr) / 4;
});
</script>

<script lang="ts">
export default {
  name: 'HotelCardRating',
};
</script>

<template lang="pug">
div
  b-form-rating(
    :id="`rating-popover-target-${id}`"
    v-model="avgRating"
    variant="warning"
    no-border
    inline
    readonly)

  b-popover(
    :target="`rating-popover-target-${id}`"
    triggers="hover"
    placement="top")
    template(#title) Ratings
    div(class="d-flex align-items-center")
      span(class="flex-1 text-muted")
        i(class="text-primary fas fa-user-tie")
        | Staff:
      b-form-rating(
        :value="props.rating.staff"
        variant="warning"
        no-border
        inline)
    div(class="d-flex align-items-center")
      span(class="flex-1 text-muted")
        i(class="text-primary fas fa-concierge-bell")
        | Service:
      b-form-rating(
        :value="props.rating.service"
        variant="warning"
        no-border
        inline)
    div(class="d-flex align-items-center")
      span(class="flex-1 text-muted")
        i(class="text-primary fas fa-soap")
        | Cleanliness:
      b-form-rating(
        :value="props.rating.cleanliness"
        variant="warning"
        no-border
        inline)
    div(class="d-flex align-items-center")
      span(class="flex-1 text-muted")
        i(class="text-primary fas fa-couch")
        | Comfort:
      b-form-rating(
        :value="props.rating.comfort"
        variant="warning"
        no-border
        inline)
</template>

<style scoped lang="sass">
.b-rating
  background-color: transparent
</style>
