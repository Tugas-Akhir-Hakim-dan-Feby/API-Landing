<script>
import dayjs from "dayjs";
import "dayjs/locale/id";

import Loader from "../components/Loader.vue";

import NoImage from "../assets/images/no-image.png";

export default {
  props: ["slug"],
  data() {
    return {
      isLoading: false,
      article: {},
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      this.isLoading = true;

      this.$store
        .dispatch("showData", ["article/show-by-slug", this.slug])
        .then((response) => {
          this.isLoading = false;
          this.article = response.data;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$router.push({
            name: "Article Not Found",
            params: { catchAll: this.slug },
          });
        });
    },
    dateTimeFormat(date) {
      if (date == null) {
        date = dayjs().locale("id");
        return date.format("DD MMMM YYYY");
      }

      date = dayjs(date).locale("id");
      return date.format("DD MMMM YYYY");
    },
    handleErrorImage(event) {
      event.target.src = null;
      event.target.src = NoImage;
    },
  },
  components: { Loader },
};
</script>
<template>
  <div class="container" style="padding-top: 8rem">
    <div class="row">
      <div class="col">
        <div class="card shadow position-relative">
          <Loader v-if="isLoading" />
          <img
            :src="
              article.document
                ? article.document.documentPath
                : '../assets/images/no-image.png'
            "
            height="300"
            class="card-img-top"
            @error="handleErrorImage($event)"
          />
          <div class="card-body">
            <h3 class="text-dark" v-html="article.articleTitle"></h3>
            <div class="text-muted small">
              <ul>
                <li class="me-3">
                  <i class="fa fa-user me-1"></i>
                  {{ article.user ? article.user.name : "Unknown User" }}
                </li>
                <li>
                  <i class="fa fa-clock me-1"></i>
                  {{ dateTimeFormat(article.createdAt) }}
                </li>
              </ul>
            </div>
            <p class="text-dark" v-html="article.articleContent"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-body ul {
  padding: 0;
  list-style-type: none;
  display: flex;
}
form input.form-control {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
button.btn-primary {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
