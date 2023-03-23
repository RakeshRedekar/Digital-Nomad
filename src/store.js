import { createStore } from "vuex";
import { loginModule } from "./modules/login";
export const store = createStore({
  modules: { loginModule },
});
