<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { ref } from 'vue';

interface Props {
  showcaseImg: string;
}

const props = withDefaults(defineProps<Props>(), {
  showcaseImg: '',
});
const carouselImgs = ref([] as string[]);
const slide = ref(0);
const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const setCarouselImgs = () => {
  carouselImgs.value = [
    `hotels/${props.showcaseImg}`,
    ...Array.from(Array(4).keys()).map(() => `carousel/${randomNumber(1, 29)}`),
  ];
};

onBeforeMount(() => {
  setCarouselImgs();
});

const getImageUrl = (name: string) => {
  const str = `../assets/img/${name}.jpg`;

  return new URL(str, import.meta.url).href;
};
</script>

<script lang="ts">
export default {
  name: 'HotelCarousel',
};
</script>

<template lang="pug">
section
  b-carousel(
    v-model="slide"
    controls
    indicators
    :interval="4000")
    b-carousel-slide(
      v-for="img, i in carouselImgs"
      :key="i")
      template(#img)
        img(
          class="max-h-20 w-100 object-fit-cover object-position-center-bottom rounded"
          :src="getImageUrl(img)")
  div(class="d-flex gap-0q mt-1 max-h-5 ")
    button(
      v-for="img, i in carouselImgs"
      :key="i"
      class="flex-1 reset-btn"
      @click="slide = i")
      img(
        class="w-100 h-100 object-fit-cover object-position-center-bottom rounded"
        :class="slide !== i ? 'grayscale' : ''"
        :src="getImageUrl(img)")
</template>
