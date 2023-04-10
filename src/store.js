import { createStore } from "vuex";
import { loginModule } from "./modules/login";
import { homeModule } from "./modules/homeModule";
import { plansModule } from "./modules/plansModule";
export const store = createStore({
  modules: { loginModule, homeModule, plansModule },
});
