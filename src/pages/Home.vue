<script>
import HomeSlider from "../components/home/HomeSlider.vue";
import Bio from "../components/home/Bio.vue";
import Article from "../components/home/Article.vue";
import Expert from "../components/home/Expert.vue";
import Chart from "../components/home/Chart.vue";

import CompanyMember from "../components/home/CompanyMember.vue";
export default {
  mounted() {
    document.title = "Asosiasi Pengelasan Indonesia";
  },
  components: { HomeSlider, Bio, Article, Expert, Chart, CompanyMember },
};
</script>

<style></style>

<template>
  <HomeSlider />

  <div class="container mt-5">
    <div class="card shadow">
      <div class="card-body">
        <div class="p-3 m-0 d-flex justify-content-between align-items-center">
          <p class="h4">
            Mari bergabung untuk membangun Pengelasan di Indonesia.
          </p>
          <div class="d-flex align-items-center">
            <a
              :href="`${$store.state.basePathSiteman}auth/register`"
              class="btn btn-success btn-lg"
              style="background-color: #28a745; border: none"
              >Daftar</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <Expert />

  <Chart />

  <Article />

  <CompanyMember />
</template>
