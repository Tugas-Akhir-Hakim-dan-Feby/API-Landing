<script>
import cookie from "js-cookie";

export default {
  data() {
    return {
      isLoading: false,
      form: {
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  mounted() {
    document.title = "Login";
    this.isLoggedIn();
  },
  methods: {
    isLoggedIn() {
      if (cookie.get("token")) {
        this.$router.push({ name: "Home" });
      }
    },
    handleSubmit() {
      this.isLoading = true;

      this.$store
        .dispatch("postData", ["auth/login", this.form])
        .then((response) => {
          this.isLoading = false;
          cookie.set("token", response.token);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          this.isLoading = false;
          if (error.response.data.messages) {
            this.errors = error.response.data.messages;
          } else {
            this.msg = error.response.data.message;
          }
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm col-md col-lg-4">
        <div class="mt-3 mb-4 text-center">
          <h5>
            <span class="fw-normal">Silahkan&nbsp;</span>
            <span class="fw-bold">Login</span>
          </h5>
        </div>

        <form @submit.prevent="handleSubmit" method="post">
          <div class="mb-3">
            <label>Email<span class="text-danger">*</span></label>
            <input
              type="email"
              class="form-control"
              v-model="form.email"
              :disabled="isLoading"
              :class="{ 'is-invalid': errors.email }"
            />
            <div
              class="invalid-feedback"
              v-if="errors.email"
              v-for="(error, index) in errors.email"
              :key="index"
              v-html="error"
            ></div>
          </div>
          <div class="mb-3">
            <label>Password<span class="text-danger">*</span></label>
            <input
              type="password"
              class="form-control"
              v-model="form.password"
              :disabled="isLoading"
              :class="{ 'is-invalid': errors.password }"
            />
            <div
              class="invalid-feedback"
              v-if="errors.password"
              v-for="(error, index) in errors.password"
              :key="index"
              v-html="error"
            ></div>
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-primary form-control" v-if="!isLoading">
              Login
            </button>
            <button
              class="btn btn-primary form-control"
              type="button"
              disabled
              v-if="isLoading"
            >
              <span
                class="spinner-border spinner-border-sm me-1"
                role="status"
                aria-hidden="true"
              ></span>
              Harap Tunggu...
            </button>
          </div>
          <div class="mt-5 text-center">
            Jika belum memiliki akun?
            <router-link :to="{ name: 'Register' }"
              >silahkan registrasi</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
