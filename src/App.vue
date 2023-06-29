<script>
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
import jsCookie from "js-cookie";

export default {
  data() {
    return {};
  },
  watch: {},
  methods: {},
  components: { Header, Footer },
};
</script>

<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<style>
.swiper .swiper-button-prev {
  left: 20px;
}

.swiper .swiper-button-next {
  right: 20px;
}

.swiper .swiper-button-next,
.swiper .swiper-button-prev {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}

.swiper .swiper-button-next::after,
.swiper .swiper-button-prev::after {
  font-size: 20px;
  font-weight: bold;
}

.swiper-button-prev,
.swiper-button-next {
  color: #fff !important;
  font-size: 18px;
  background-color: #007bff !important;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background-color: #0056b3 !important;
}

.displayCard {
  cursor: pointer;
}

.displayCard:hover {
  box-shadow: 0 0 5px 5px rgb(0 0 0 / 0.2) !important;
  transform: translateY(-3%);
  transition: transform 0.5s ease-in-out;
}

.displayCard:hover .card-title {
  color: #0d6efd;
}

@media (max-height: 800px) {
  footer {
    position: static;
  }
  header {
    padding-top: 40px;
  }
}
</style>
