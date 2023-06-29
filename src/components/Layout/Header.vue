<script>
import cookie from "js-cookie";

export default {
  props: ["isLoggedIn", "user"],
  watch: {},
  methods: {
    handleLogout() {
      this.$store
        .dispatch("postData", ["auth/logout", {}])
        .then((response) => {
          cookie.remove("token");
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {});
    },
  },
};
</script>
<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white shadow-lg fixed-top mb-5"
  >
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="navbar-brand">
        <img
          src="../../assets/images/api-iws.png"
          alt="logo"
          height="70"
          class="mb-0 mt-0"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{ name: 'Home' }" class="nav-link fw-bold"
              >Beranda</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Expert' }" class="nav-link fw-bold"
              >Praktisi Ahli</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold" :to="{ name: 'Article' }"
              >Berita</router-link
            >
          </li>
          <li class="nav-item">
            <a
              :href="`${$store.state.basePathSiteman}auth/login`"
              class="mt-1 ms-lg-3 me-4 btn btn-primary"
              style="border: none"
              >Masuk</a
            >
          </li>
          <li class="nav-item">
            <a
              :href="`${$store.state.basePathSiteman}auth/register`"
              class="mt-1 btn btn-success"
              style="background-color: #28a745; border: none"
              >Daftar</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  font-size: 18px;
}
</style>
