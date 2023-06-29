import { createStore } from "vuex";
import action from "./services/action";

const store = createStore({
  modules: {
    action,
  },
  state: {
    basePathSiteman: "https://dashboard.halan-polindra.tech/",
  },
});

export default store;
