<script>
import cookie from "js-cookie";
import Success from "../../components/notifications/Success.vue";

export default {
  data() {
    return {
      isLoading: false,
      form: {
        name: "",
        email: "",
        password: "",
        retypePassword: "",
      },
      error: {},
    };
  },
  mounted() {
    document.title = "Register";
    this.isLoggedIn();
  },
  methods: {
    isLoggedIn() {
      if (cookie.get("token")) {
        this.$router.push({ name: "Home" });
      }
    },
    handleSubmit() {
      this.error = {};
      this.isLoading = true;
      this.$store
        .dispatch("postData", ["auth/register", this.form])
        .then((response) => {
          this.isLoading = false;
          $("#successMessage").modal("show");
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error.response.data.messages;
        });
    },
  },
  components: { Success },
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm col-md col-lg-4">
        <div class="mt-3 mb-4 text-center">
          <h5>
            <span class="fw-normal">Silahkan&nbsp;</span>
            <span class="fw-bold">Registrasi</span>
          </h5>
        </div>

        <form @submit.prevent="handleSubmit" method="post">
          <div class="mb-3">
            <label>Nama Lengkap<span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': error.name }"
              :disabled="isLoading"
              v-model="form.name"
            />
            <div
              class="invalid-feedback"
              v-for="(error, index) in error.name"
              :key="index"
              v-html="error"
            ></div>
          </div>
          <div class="mb-3">
            <label>Email<span class="text-danger">*</span></label>
            <input
              type="email"
              class="form-control"
              :class="{ 'is-invalid': error.email }"
              :disabled="isLoading"
              v-model="form.email"
            />
            <div
              class="invalid-feedback"
              v-for="(error, index) in error.email"
              :key="index"
              v-html="error"
            ></div>
          </div>
          <div class="mb-3">
            <label>Password<span class="text-danger">*</span></label>
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': error.password }"
              :disabled="isLoading"
              v-model="form.password"
            />
            <div
              class="invalid-feedback"
              v-for="(error, index) in error.password"
              :key="index"
              v-html="error"
            ></div>
          </div>
          <div class="mb-3">
            <label>Ulangi Password<span class="text-danger">*</span></label>
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': error.retypePassword }"
              :disabled="isLoading"
              v-model="form.retypePassword"
            />
            <div
              class="invalid-feedback"
              v-for="(error, index) in error.retypePassword"
              :key="index"
              v-html="error"
            ></div>
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-primary btn-block">Daftar</button>
          </div>
          <div class="mt-5 text-center">
            Jika sudah memiliki akun?
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>

  <Success
    :message="'<b>registrasi berhasil!</b> harap periksa email anda untuk melakukan verifikasi akun.'"
    :url="{ name: 'Login' }"
  />
</template>
