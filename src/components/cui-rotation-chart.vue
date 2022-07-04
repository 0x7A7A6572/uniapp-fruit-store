<template>
  <swiper
    class="screen-swiper round-dot"
    :indicator-dots="indicatorDots"
    :circular="circular"
    :autoplay="autoplay"
    :interval="interval"
    :duration="duration"
  >
    <swiper-item v-for="(item, index) in swiperImage" :key="index">
      <image :src="item" mode="aspectFill"></image>
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  name: "cui-rotation-chart",
  props: {
    swiperImage: {type: Array},
    indicatorDots: { type: Boolean, default: false },
    circular: { type: Boolean, default: true },
    autoplay: { type: Boolean, default: true },
    interval: { type: Number, default: 2000 },
    duration: { type: Number, default: 500 },
  },
  setup() {},
};
</script>

<style></style>
