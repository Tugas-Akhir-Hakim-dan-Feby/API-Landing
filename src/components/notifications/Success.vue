<script>
export default {
  props: ["message", "url"],
  methods: {
    handleOk() {
      $("#successMessage").modal("hide");
      this.$router.push(this.url);
    },
  },
};
</script>
<template>
  <div
    class="modal fade"
    id="successMessage"
    tabindex="-1"
    aria-labelledby="successMessageLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5"
            id="successMessageLabel"
            v-html="'sukses'"
          ></h1>
        </div>
        <div class="modal-body" v-html="message"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="handleOk">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
