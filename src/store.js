import { createStore } from "vuex";
import { loginModule } from "./modules/login";
import { homeModule } from "./modules/homeModule";
export const store = createStore({
  modules: { loginModule, homeModule },
});
