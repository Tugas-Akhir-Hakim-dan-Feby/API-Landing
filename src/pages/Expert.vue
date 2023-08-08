<script>
import Loader from "../components/Loader.vue";
import Pagination from "../components/Pagination.vue";
import ProfileNotFound from "../assets/images/profile-not-found.webp";

export default {
  data() {
    return {
      isLoading: false,
      filters: {
        search: "",
        page: 1,
        perPage: 12,
      },
      experts: [],
      expert: {},
      metaPagination: {},
    };
  },
  mounted() {
    this.getExperts();
  },
  methods: {
    getExperts() {
      this.isLoading = true;

      const params = [
        `per_page=${this.filters.perPage}`,
        `page=${this.filters.page}`,
        `search=${this.filters.search}`,
      ].join("&");

      this.$store
        .dispatch("getData", ["user/expert/all", params])
        .then((response) => {
          this.isLoading = false;
          this.experts = response.data;
          this.metaPagination = response.meta;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },
    onSearch() {
      setTimeout(() => {
        this.getExperts();
      }, 1000);
    },
    onPageChange(e) {
      this.filters.page = e;
      this.getExperts();
    },
    setExpert(expert) {
      this.expert = expert;
    },
    handleErrorImage(event) {
      event.target.src = null;
      event.target.src = ProfileNotFound;
    },
  },
  components: { Loader, Pagination },
};
</script>

<template>
  <div class="container" style="padding-top: 8rem">
    <div class="row align-items-center gy-3 mb-4 pb-lg-3 pb-1">
      <div class="col-lg-5 col-md-4">
        <h4 class="fw-bold">Praktisi Ahli</h4>
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

    <div class="alert alert-warning" v-if="experts.length < 1 && !isLoading">
      Data praktisi ahli tidak tersedia.
    </div>

    <div
      class="row position-relative"
      :style="{ height: isLoading ? '50vh' : '' }"
    >
      <Loader style="height: 100%" v-if="isLoading" />
      <div
        v-else
        class="col-lg-3 col-md-4 col-sm-6 p-2"
        v-for="(expert, index) in experts"
        :key="index"
      >
        <div
          class="card displayCard position-relative"
          data-bs-toggle="modal"
          data-bs-target="#detailExpert"
          @click="setExpert(expert)"
        >
          <img
            :src="
              expert.welderMember
                ? expert.welderMember?.pasPhoto
                : '../../assets/images/profile-not-found.webp'
            "
            @error="handleErrorImage($event)"
            height="250"
          />
          <div class="card-body position-absolute">
            <div class="card-sub-body">
              <h5 class="card-title">{{ expert.name }}</h5>
              <small>{{ expert.expert?.instance }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Pagination
      @onPageChange="onPageChange($event)"
      :pagination="metaPagination"
    />
  </div>

  <div
    class="modal fade"
    id="detailExpert"
    tabindex="-1"
    aria-labelledby="detailExpertLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="detailExpertLabel">
            Biodata Praktisi Ahli
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row align-items-center">
            <div class="col-lg-4">
              <center>
                <img
                  class="img-fluid"
                  height="400"
                  width="300"
                  :src="expert.welderMember?.pasPhoto ?? ProfileNotFound"
                  @error="handleErrorImage($event)"
                />
              </center>
            </div>
            <div class="col-sm-8">
              <table class="table table-bordered table-hover">
                <tr>
                  <th class="border p-2 bg-primary">Nomor Keanggotaan</th>
                  <td class="border p-2">{{ expert.membershipCard ?? "-" }}</td>
                </tr>
                <tr>
                  <th class="border p-2 bg-primary">Email</th>
                  <td class="border p-2">{{ expert.email }}</td>
                </tr>
                <tr>
                  <th class="border p-2 bg-primary">Nama</th>
                  <td class="border p-2">{{ expert.name }}</td>
                </tr>
                <tr>
                  <th class="border p-2 bg-primary">Keahlian</th>
                  <td class="border p-2">
                    <ul class="ms-2">
                      <li
                        v-for="(welderSkill, index) in expert.welderHasSkills"
                        :key="index"
                        v-html="welderSkill.welderSkill.skillName"
                      ></li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th class="border p-2 bg-primary">Asal Instansi</th>
                  <td class="border p-2">{{ expert.expert?.instance }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-primary {
  background-color: #cfe2ff !important;
}

input.form-control {
  border-top-right-radius: 0.375rem !important;
  border-bottom-right-radius: 0.375rem !important;
}

.displayCard img {
  background-size: cover;
}

.displayCard .card-body {
  height: 100%;
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.875) 27%,
    hsla(0, 0%, 100%, 0)
  );
  color: white;
}

.displayCard .card-sub-body {
  bottom: 10px;
  font-weight: bold;
  position: inherit;
}

.displayCard:hover .card-sub-body {
  color: #0d6efd;
}
</style>
