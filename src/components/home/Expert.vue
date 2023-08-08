<script>
import Loader from "../Loader.vue";
import ProfileNotFound from "../../assets/images/profile-not-found.webp";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/vue";

import "swiper/css/bundle";

export default {
  data() {
    return {
      isLoading: false,
      experts: [],
      expert: {},
    };
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Autoplay],
    };
  },
  mounted() {
    this.getExperts();
  },
  methods: {
    getExperts() {
      this.isLoading = true;

      const params = [`per_page=6`].join("&");

      this.$store
        .dispatch("getData", ["user/expert/all", params])
        .then((response) => {
          this.isLoading = false;
          this.experts = response.data;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },
    limitText(text, count) {
      return text.slice(0, count) + (text.length > count ? "..." : "");
    },
    setExpert(expert) {
      this.expert = expert;
    },
    handleErrorImage(event) {
      event.target.src = null;
      event.target.src = ProfileNotFound;
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
        <span class="fw-bold">Praktisi</span>
        <span class="fw-normal text-secondary"> Ahli</span>
      </h4>
      <router-link :to="{ name: 'Expert' }" class="" style="font-size: 16px"
        >Lihat Semua Praktisi</router-link
      >
    </div>
    <p class="text-muted text-center" v-if="isLoading">Harap tunggu...</p>
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
      <Swiper-slide v-for="(expert, index) in experts" :key="index">
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
      </Swiper-slide>
    </Swiper>
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
                  :src="expert.welderMember?.pasPhoto"
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
