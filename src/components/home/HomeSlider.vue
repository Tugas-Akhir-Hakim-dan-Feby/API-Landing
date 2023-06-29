<script>
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css/bundle";

export default {
  data() {
    return {
      images: [
        "https://www.api-iws.org/cache/lofthumbs/650x450-VisitBoothAPI.jpeg",
        "https://www.api-iws.org/cache/lofthumbs/650x450-Blasting_Coating_lv_1.jpeg",
        "https://www.api-iws.org/cache/lofthumbs/650x450-513A9274-Large-1030x579.jpg",
      ],
    };
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    };
  },
  directives: {
    backgroundImage(el, binding) {
      el.style.backgroundImage = `url('${binding.value}')`;
    },
  },
  components: { Swiper, SwiperSlide },
};
</script>

<template>
  <div style="margin-top: 6rem">
    <swiper
      :modules="modules"
      :space-between="50"
      :slides-per-view="1"
      navigation
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :initial-slide="1"
      :loop="true"
      :observer="true"
      class="px-lg-5"
    >
      <swiper-slide v-for="(image, index) in images" :key="index">
        <div class="card shadow-sm" v-background-image="image">
          <div class="card-body"></div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.swiper-slide .card {
  height: 412px;
  width: 100%;
  object-fit: cover;
  background-position: 100%;
  background-size: cover;
}
</style>
