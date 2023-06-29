<template>
  <div class="text-center" style="padding-top: 10rem; height: 100vh">
    <img
      src="/src/assets/images/file-searching.svg"
      height="90"
      alt="File not found Image"
    />

    <h1 class="text-error mt-4">404</h1>
    <h4 class="text-uppercase text-danger mt-3">Halaman tidak ditemukan!</h4>
    <router-link :to="{ name: 'Home' }" class="btn btn-info text-white mt-3"
      ><i class="mdi mdi-reply"></i> Kembali</router-link
    >
  </div>
</template>
