<script>
export default {
  mounted() {
    document.title = "Register";
  },
  methods: {},
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm col-md col-lg">
        <div class="mt-3 mb-4 text-center">
          <h3>
            <span class="fw-normal">Daftar&nbsp;</span>
            <span class="fw-bold">Member</span>
          </h3>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-5 offset-lg-1">
        <div class="card displayCard">
          <div class="card-body">
            <div class="text-center">
              <h5>Welder Member</h5>
              <hr />
            </div>

            <ul>
              <li>
                Mendapatkan informasi terbaru tentang perkembangan teknologi
                pengelasan melalui media yang dikeluarkan oleh API secara
                berkala (Bulletin, Jurnal dan lainnya).
              </li>
              <li>
                Mendapatkan potongan harga untuk mengikuti seminar/workshop dan
                training yang diadakan oleh API.
              </li>
              <li>
                Mendapatkan akses dan petunjuk praktis untuk mengatasi
                permasalahan tentang pengelasan
              </li>
              <li>
                Memperoleh kemudahan untuk mendapatkan akses dengan sesama rekan
                seprofesi dan perusahaan yang bergerak di bidang pengelasan baik
                didalam negeri maupun luar negeri.
              </li>
              <li>
                Mendapat Akses untuk download Materi pengelasan yang ditulis
                oleh pakar pengelasan Indonesia
              </li>
              <li>
                Dapat Join kedalam milist yang up to date melalui email mengenai
                berita dan event API-IWS
              </li>
            </ul>

            <hr />
            <router-link
              :to="{ name: 'Register Welder Member' }"
              class="btn btn-primary"
              style="width: 100%"
            >
              Daftar
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-lg-5">
        <div class="card displayCard">
          <div class="card-body">
            <div class="text-center">
              <h5>Perusahaan Member</h5>
              <hr />
            </div>

            <ul>
              <li v-for="(item, index) in 10" :key="index">
                Aturan {{ index + 1 }}
              </li>
            </ul>

            <hr />
            <router-link
              :to="{ name: 'Register Company Member' }"
              class="btn btn-primary"
              style="width: 100%"
            >
              Daftar
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
