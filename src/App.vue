<script>
import Header from "./components/layout/Header.vue";
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";
import jsCookie from "js-cookie";

export default {
  data() {
    return {
      isLoggedIn: false,
      user: {},
    };
  },
  watch: {
    "$route.params.search": {
      handler: function (search) {
        this.checkLogin();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    checkLogin() {
      if (jsCookie.get("token")) {
        this.$store
          .dispatch("postData", ["auth/check", {}])
          .then((response) => {
            this.user = response.user;
            this.isLoggedIn = true;
          })
          .catch((error) => {
            this.isLoggedIn = false;
            jsCookie.remove("token");
          });

        if (!jsCookie.get("token")) {
          this.$router.push({ name: "Login" });
        }
      }
    },
  },
  components: { Header, Navbar, Footer },
};
</script>

<template>
  <Header :isLoggedIn="isLoggedIn" :user="user" />
  <Navbar :isLoggedIn="isLoggedIn" />
  <router-view></router-view>
  <Footer />
</template>

<style>
.displayCard:hover {
  box-shadow: 0 0 5px 5px rgb(0 0 0 / 0.2) !important;
  transform: translateY(-3%);
  transition: transform 0.5s ease-in-out;
}

footer {
  bottom: 0;
}

@media (max-height: 800px) {
  footer {
    position: static;
  }
  header {
    padding-top: 40px;
  }
}

.footer-distributed {
  background-color: #2c292f;
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  font: bold 16px sans-serif;
  padding: 50px 50px 60px 50px;
  margin-top: 80px;
}

.footer-distributed .footer-left,
.footer-distributed .footer-center,
.footer-distributed .footer-right {
  display: inline-block;
  vertical-align: top;
}

.footer-distributed .footer-left {
  width: 30%;
}

.footer-distributed h3 {
  color: #ffffff;
  margin: 0;
}

/* The company logo */

.footer-distributed .footer-left img {
  width: 30%;
}

.footer-distributed h3 span {
  color: #e0ac1c;
}

.footer-distributed .footer-links {
  color: #ffffff;
  margin: 20px 0 12px;
}

.footer-distributed .footer-links a {
  display: inline-block;
  line-height: 1.8;
  text-decoration: none;
  color: inherit;
}

.footer-distributed .footer-company-name {
  color: #8f9296;
  font-size: 14px;
  font-weight: normal;
  margin: 0;
}

.footer-distributed .footer-center {
  width: 35%;
}

.footer-distributed .footer-center i {
  background-color: #33383b;
  color: #ffffff;
  font-size: 25px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  text-align: center;
  line-height: 42px;
  margin: 10px 15px;
  vertical-align: middle;
}

.footer-distributed .footer-center i.fa-envelope {
  font-size: 17px;
  line-height: 38px;
}

.footer-distributed .footer-center p {
  display: inline-block;
  color: #ffffff;
  vertical-align: middle;
  margin: 0;
}

.footer-distributed .footer-center p span {
  display: block;
  font-weight: normal;
  font-size: 14px;
  line-height: 2;
}

.footer-distributed .footer-center p a {
  color: #e0ac1c;
  text-decoration: none;
}

.footer-distributed .footer-right {
  width: 30%;
}

.footer-distributed .footer-company-about {
  line-height: 20px;
  color: #92999f;
  font-size: 13px;
  font-weight: normal;
  margin: 0;
}

.footer-distributed .footer-company-about span {
  display: block;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.footer-distributed .footer-icons {
  margin-top: 25px;
}

.footer-distributed .footer-icons a {
  display: inline-block;
  width: 35px;
  height: 35px;
  cursor: pointer;
  background-color: #33383b;
  border-radius: 2px;

  font-size: 20px;
  color: #ffffff;
  text-align: center;
  line-height: 35px;

  margin-right: 3px;
  margin-bottom: 5px;
}

@media (max-width: 880px) {
  .footer-distributed .footer-left,
  .footer-distributed .footer-center,
  .footer-distributed .footer-right {
    display: block;
    width: 100%;
    margin-bottom: 40px;
    text-align: center;
  }

  .footer-distributed .footer-center i {
    margin-left: 0;
  }
}
</style>
