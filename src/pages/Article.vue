<script>
import dayjs from "dayjs";
import "dayjs/locale/id";
import NoImage from "../assets/images/no-image.png";
import ProfileNotFound from "../assets/images/profile-not-found.webp";

import Loader from "../components/Loader.vue";
import Pagination from "../components/Pagination.vue";

export default {
  data() {
    return {
      isLoading: false,
      articles: [],
      filters: {
        page: 1,
        perPage: 9,
        search: "",
      },
      metaPagination: {},
    };
  },
  mounted() {
    this.getArticles();
    dayjs.locale("id");
  },
  methods: {
    getArticles() {
      this.isLoading = true;

      const params = [
        `page=${this.filters.page}`,
        `per_page=${this.filters.perPage}`,
        `search=${this.filters.search}`,
      ].join("&");

      this.$store
        .dispatch("getData", ["article/all", params])
        .then((response) => {
          this.isLoading = false;
          this.articles = response.data;
          this.metaPagination = response.meta;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },
    onPageChange(e) {
      this.filters.page = e;
      this.getArticles();
    },
    onSearch() {
      setTimeout(() => {
        this.getArticles();
      }, 1000);
    },
    dateTimeFormat(date) {
      if (date == null) {
        date = dayjs().locale("id");
        return date.format("DD MMMM YYYY");
      }

      date = dayjs(date).locale("id");
      return date.format("DD MMMM YYYY");
    },
    limitText(text) {
      return text.slice(0, 200) + (text.length > 200 ? "..." : "");
    },
    handleErrorImage(event) {
      event.target.src = null;
      event.target.src = NoImage;
    },
  },
  components: { Loader, Pagination },
};
</script>
<template>
  <div class="container" style="padding-top: 8rem">
    <div class="row align-items-center gy-3 mb-4 pb-lg-3 pb-1" style="">
      <div class="col-lg-5 col-md-4">
        <h4 class="fw-bold">Berita</h4>
      </div>
      <div class="col-lg-7 col-md-8">
        <div class="row">
          <div
            class="col-lg-5 col-sm-6 d-flex justify-content-end align-items-center"
          ></div>
          <div class="col-lg-7 col-sm-6">
            <div class="input-group">
              <input
                type="search"
                class="form-control"
                placeholder="Pencarian"
                v-model="filters.search"
                @input="onSearch"
              />
              <i
                class="fas fa-search text-muted position-absolute top-50 end-0 translate-middle-y me-3 zindex-5 fs-lg"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-warning" v-if="articles.length < 1 && !isLoading">
      Data berita tidak tersedia.
    </div>
    <div
      class="row row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-md-4 gy-2 position-relative"
      :style="{ height: isLoading ? '50vh' : '' }"
    >
      <Loader style="height: 100%" v-if="isLoading" />
      <div class="col pb-3" v-for="(article, index) in articles" :key="index">
        <article class="card border-0 shadow h-100 displayCard">
          <div class="position-relative">
            <router-link
              :to="{
                name: 'Article Detail',
                params: { slug: article.articleSlug },
              }"
              class="position-absolute top-0 start-0 w-100 h-100"
              aria-label="Read more"
            ></router-link>
            <img
              :src="
                article.document
                  ? article.document?.documentPath
                  : '../assets/images/no-image.png'
              "
              height="200"
              class="card-img-top"
              :alt="article.articleTitle"
              @error="handleErrorImage($event)"
            />
          </div>
          <div class="card-body pb-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <span class="fs-sm text-muted">{{
                dateTimeFormat(article.createdAt)
              }}</span>
            </div>
            <h3 class="h5 mb-0">
              <router-link
                :to="{
                  name: 'Article Detail',
                  params: { slug: article.articleSlug },
                }"
                >{{ article.articleTitle }}</router-link
              >
            </h3>
          </div>
          <div class="card-footer py-4">
            <a
              href="#"
              class="d-flex align-items-center fw-bold text-dark text-decoration-none"
            >
              <img
                :src="'/src/assets/images/profile-not-found.webp'"
                class="rounded-circle me-3"
                width="48"
                :alt="article.user?.name"
              />
              {{ article.user?.name }}
            </a>
          </div>
        </article>
      </div>
    </div>

    <Pagination
      @onPageChange="onPageChange($event)"
      :pagination="metaPagination"
    />
  </div>
</template>

<style scoped>
input.form-control {
  border-top-right-radius: 0.375rem !important;
  border-bottom-right-radius: 0.375rem !important;
}
</style>
