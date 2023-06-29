<script>
import Loader from "../Loader.vue";
export default {
  data() {
    return {
      skillChart: {},
      isLoading: false,
    };
  },
  mounted() {
    document.title = "Asosiasi Pengelasan Indonesia";
    this.getSkillChart();
  },
  methods: {
    getSkillChart() {
      this.isLoading = true;
      this.$store
        .dispatch("showData", ["chart", "skill"])
        .then((response) => {
          this.isLoading = false;
          this.skillChart = response;
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
  },
  components: { Loader },
};
</script>
<template>
  <div class="container mt-5">
    <div
      class="mt-5 mb-3 text-center d-flex justify-content-between align-items-center"
    >
      <h4>
        <span class="fw-bold">Perkembangan</span>
        <span class="fw-normal text-secondary"> Pengelasan</span>
      </h4>
    </div>

    <div class="card position-relative">
      <Loader v-if="isLoading" />
      <div class="card-body">
        <line-chart
          :data="skillChart.data"
          xtitle="Jenis Keahlian"
          ytitle="Total"
          loading="Loading..."
          :download="true"
        ></line-chart>
      </div>
    </div>
  </div>
</template>
