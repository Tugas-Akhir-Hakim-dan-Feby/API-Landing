<script>
import Loader from "../Loader.vue";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/vue";

import NoImage from "../../assets/images/no-image.png";

import "swiper/css/bundle";

export default {
  data() {
    return {
      isLoading: false,
      articles: [],
    };
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Autoplay],
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      this.isLoading = true;

      const params = [`per_page=6`].join("&");

      this.$store
        .dispatch("getData", ["article/all", params])
        .then((response) => {
          this.isLoading = false;
          this.articles = response.data;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },
    limitText(text, count) {
      return text.slice(0, count) + (text.length > count ? "..." : "");
    },
    handleErrorImage(event) {
      event.target.src = null;
      event.target.src = NoImage;
    },
  },
  components: { Loader, Swiper, SwiperSlide },
};
</script>

<template>
  <div class="container">
    <div
      class="mt-5 mb-3 text-center d-flex justify-content-between align-items-center"
    >
      <h4>
        <span class="fw-bold">Berita</span>
        <span class="fw-normal text-secondary"> Terbaru</span>
      </h4>
      <router-link :to="{ name: 'Article' }" class="" style="font-size: 16px"
        >Lihat Semua Berita</router-link
      >
    </div>

    <p class="text-muted text-center" v-if="isLoading">Harap tunggu...</p>
    <div class="alert alert-warning" v-else-if="articles.length < 1">
      Data berita tidak tersedia.
    </div>

    <Swiper
      :modules="modules"
      :space-between="100"
      :breakpoints="{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
      }"
      navigation
      :initial-slide="1"
      :loop="true"
      :autoplay="{
        delay: 3000,
      }"
      class="px-lg-5"
    >
      <Swiper-slide v-for="(article, index) in articles" :key="index">
        <div class="card displayCard mb-3">
          <router-link
            :to="{
              name: 'Article Detail',
              params: { slug: article.articleSlug },
            }"
            class="text-decoration-none"
          >
            <img
              :src="
                article.document
                  ? article.document?.documentPath
                  : '../../assets/images/no-image.png'
              "
              height="150"
              class="card-img-top"
              :alt="article.articleTitle"
              @error="handleErrorImage($event)"
            />
            <div class="card-body">
              <p class="text-muted small">
                Dibuat <strong>{{ article.user.name }}</strong>
              </p>
              <h5
                class="card-title fw-bold"
                v-html="limitText(article.articleTitle, 20)"
              />
              <p
                class="card-text text-muted"
                v-html="limitText(article.articleExcerpt, 80)"
              />
            </div>
            <div class="card-footer">
              <button class="btn btn-sm btn-primary form-control">
                Selengkapnya
              </button>
            </div>
          </router-link>
        </div>
      </Swiper-slide>
    </Swiper>
  </div>
</template>

<style scoped>
.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  opacity: 0.8;
  transition: background-color 0.3s ease;
}

.swiper-pagination-bullet-active {
  background-color: #007bff;
}

@media (min-width: 576px) {
  .displayCard {
    margin-inline: 45px;
  }
  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next {
    right: 0;
  }
}

@media (min-width: 337px) {
  .displayCard {
    margin-inline: 45px;
  }
}
</style>
