<script>
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/vue";
import Loader from "../Loader.vue";

import "swiper/css/bundle";

export default {
  data() {
    return {
      isLoading: false,
      companyMembers: [],
      companyMember: {},
    };
  },
  mounted() {
    this.getCompanyMembers();
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Autoplay],
    };
  },
  methods: {
    getCompanyMembers() {
      this.isLoading = true;

      const params = [`per_page=8`].join("&");

      this.$store
        .dispatch("getData", ["user/company-member/all", params])
        .then((response) => {
          this.isLoading = false;
          this.companyMembers = response.data;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },
    setCompanyMember(companyMember) {
      this.companyMember = companyMember;
    },
  },
  directives: {
    backgroundImage(el, binding) {
      el.style.backgroundImage = `url('${binding.value}')`;
    },
  },
  components: { Swiper, SwiperSlide, Loader },
};
</script>
<template>
  <div class="container" style="min-height: 200px">
    <div class="mt-5 mb-3 text-center">
      <h4>
        <span class="fw-bold">Member</span>
        <span class="fw-normal text-secondary"> Perusahaan</span>
      </h4>
    </div>

    <p class="text-muted text-center" v-if="isLoading">Harap tunggu...</p>

    <Swiper
      :modules="modules"
      :space-between="50"
      :breakpoints="{
        0: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 100,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 100,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 100,
        },
      }"
      :pagination="{ clickable: true }"
      :initial-slide="1"
      :loop="true"
      :autoplay="{
        delay: 3000,
      }"
      class="px-lg-5 my-5"
    >
      <Swiper-slide
        v-for="(companyMember, index) in companyMembers"
        :key="index"
      >
        <div
          class="swiper-detail position-relative"
          data-bs-toggle="modal"
          data-bs-target="#detailCompanyMember"
          @click="setCompanyMember(companyMember)"
          v-background-image="companyMember.companyMember?.companyLogo"
        >
          <div class="position-absolute">
            <p>
              {{ companyMember.companyMember?.companyName }}
            </p>
          </div>
        </div>
      </Swiper-slide>
    </Swiper>
  </div>

  <div
    class="modal fade"
    id="detailCompanyMember"
    tabindex="-1"
    aria-labelledby="detailCompanyMemberLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="detailCompanyMemberLabel">
            Biodata Perusahaan Member
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h1 class="text-muted text-center">
            {{ companyMember.companyMember?.companyName }}
          </h1>
          <div class="row align-items-center">
            <div class="col-lg-4">
              <center>
                <img
                  class="img-fluid"
                  height="400"
                  width="300"
                  :src="companyMember.companyMember?.companyLogo"
                />
              </center>
            </div>
            <div class="col-lg-8">
              <table class="table table-bordered table-hover">
                <tr>
                  <th class="border p-2 bg-primary">Nomor Keanggotaan</th>
                  <td class="border p-2">
                    {{ companyMember.membershipCard ?? "-" }}
                  </td>
                </tr>
                <tr>
                  <th class="border p-2 bg-primary">Email Perusahaan</th>
                  <td class="border p-2">
                    {{ companyMember.companyMember?.companyEmail }}
                  </td>
                </tr>
                <tr>
                  <th class="border p-2 bg-primary">Pimpinan Perusahaan</th>
                  <td class="border p-2">
                    {{ companyMember.companyMember?.companyDirector }}
                  </td>
                </tr>
                <tr>
                  <th class="border p-2 bg-primary">Alamat Perusahaan</th>
                  <td class="border p-2">
                    {{ companyMember.companyMember?.companyAddress }}
                  </td>
                </tr>
                <tr>
                  <th class="border p-2 bg-primary">Profil Perusahaan</th>
                  <td class="border p-2">
                    {{ companyMember.companyMember?.companyProfile }}
                  </td>
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
.swiper {
  height: 250px;
}

.swiper .swiper-detail {
  cursor: pointer;
  height: 150px;
  width: 150px;
  background-size: cover;
  object-fit: cover;
  background-position: center;
}

.swiper .swiper-detail div {
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.875) 27%,
    hsla(0, 0%, 100%, 0)
  );
  color: white;
  height: 100%;
  width: 100%;
}

.swiper .swiper-detail div p {
  bottom: -10px;
  left: 10px;
  position: inherit;
}

.bg-primary {
  background-color: #cfe2ff !important;
}
</style>
