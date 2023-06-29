<script>
export default {
  data() {
    return {
      form: {
        residentIdCard: "",
        dateBirth: "",
        birthPlace: "",
        workingStatus: "",
        welderSkillId: "",
      },
      skills: [],
      errors: {},
      isLoading: false,
    };
  },
  mounted() {
    this.getSkills();
  },
  computed: {
    formData() {
      let formData = new FormData();
      formData.append("resident_id_card", this.form.residentIdCard);
      formData.append("date_birth", this.form.dateBirth);
      formData.append("birth_place", this.form.birthPlace);
      formData.append("working_status", this.form.workingStatus);
      formData.append("welder_skill_id", this.form.welderSkillId);

      return formData;
    },
  },
  methods: {
    getSkills() {
      this.$store
        .dispatch("getData", ["skill/welder", {}])
        .then((response) => {
          this.skills = response.data;
        })
        .catch((error) => {});
    },
    handleSubmit() {
      console.log(this.form);
      this.$store
        .dispatch("postDataUpload", ["user/welder-member", this.formData])
        .then((response) => {
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          this.errors = error.response.data.messages;
        });
    },
    onCancel() {
      this.$router.push({ name: "Register Level" });
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm col-md col-lg">
        <div class="mt-3 mb-4 text-center">
          <h3>
            <span class="fw-normal">Daftar Member&nbsp;</span>
            <span class="fw-bold">Welder</span>
          </h3>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-6">
        <form @submit.prevent="handleSubmit" method="post">
          <div class="card">
            <div class="card-body">
              <div class="mb-3">
                <label>NIK</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="form.residentIdCard"
                  :disabled="isLoading"
                  :class="{ 'is-invalid': errors.residentIdCard }"
                />
                <div
                  class="invalid-feedback"
                  v-if="errors.residentIdCard"
                  v-for="(error, index) in errors.residentIdCard"
                  :key="index"
                  v-html="error"
                ></div>
              </div>
              <div class="mb-3">
                <label>Tempat Lahir</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.birthPlace"
                  :disabled="isLoading"
                  :class="{ 'is-invalid': errors.birthPlace }"
                />
                <div
                  class="invalid-feedback"
                  v-if="errors.birthPlace"
                  v-for="(error, index) in errors.birthPlace"
                  :key="index"
                  v-html="error"
                ></div>
              </div>
              <div class="mb-3">
                <label>Tanggal Lahir</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="form.dateBirth"
                  :disabled="isLoading"
                  :class="{ 'is-invalid': errors.dateBirth }"
                />
                <div
                  class="invalid-feedback"
                  v-if="errors.dateBirth"
                  v-for="(error, index) in errors.dateBirth"
                  :key="index"
                  v-html="error"
                ></div>
              </div>
              <div class="mb-3">
                <label>Status Bekerja</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="form.workingStatus"
                    :disabled="isLoading"
                    :class="{ 'is-invalid': errors.workingStatus }"
                    value="1"
                  />
                  <label class="form-check-label"> Ya </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="form.workingStatus"
                    :disabled="isLoading"
                    :class="{ 'is-invalid': errors.workingStatus }"
                    value="0"
                  />
                  <label class="form-check-label"> Tidak </label>
                  <div
                    class="invalid-feedback"
                    v-if="errors.workingStatus"
                    v-for="(error, index) in errors.workingStatus"
                    :key="index"
                    v-html="error"
                  ></div>
                </div>
              </div>
              <div class="mb-3">
                <label>Jenis Kompetensi</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="form.welderSkillId"
                  :disabled="isLoading"
                  :class="{ 'is-invalid': errors.welderSkillId }"
                >
                  <option selected disabled></option>
                  <option
                    v-for="(skill, index) in skills"
                    :key="index"
                    :value="skill.uuid"
                  >
                    {{ skill.skillName }}
                  </option>
                </select>
                <div
                  class="invalid-feedback"
                  v-if="errors.welderSkillId"
                  v-for="(error, index) in errors.welderSkillId"
                  :key="index"
                  v-html="error"
                ></div>
              </div>
              <div class="mb-3">
                <label>Pas Foto Formal Berwarna</label>
                <input type="file" class="form-control" />
              </div>
              <div class="mb-3">
                <label>Ijazah Pendidikan Formal</label>
                <input type="file" class="form-control" />
              </div>
              <div class="mb-3">
                <label
                  >Sertifikat Pelatihan/Kompetensi Keahlian Pengelasan
                </label>
                <input type="file" class="form-control" />
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <button class="btn btn-secondary btn-sm" @click="onCancel">
                Batal
              </button>
              <button class="btn btn-primary btn-sm">Daftar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
