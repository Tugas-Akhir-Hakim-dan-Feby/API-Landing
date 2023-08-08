export default [
  {
    path: "/:catchAll(.*)",
    name: "Not Found",
    component: () => import("../pages/NotFound.vue"),
  },
  {
    path: "/article/:catchAll(.*)",
    name: "Article Not Found",
    component: () => import("../pages/NotFound.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/Home.vue"),
  },
  {
    path: "/article",
    name: "Article",
    component: () => import("../pages/Article.vue"),
  },
  {
    path: "/article/:slug",
    name: "Article Detail",
    component: () => import("../pages/ArticleDetail.vue"),
    props: true,
  },
  {
    path: "/expert",
    name: "Expert",
    component: () => import("../pages/Expert.vue"),
  },
  {
    path: "/check-certificate",
    name: "Check Certificate",
    component: () => import("../pages/CheckCertificate.vue"),
  },
];
