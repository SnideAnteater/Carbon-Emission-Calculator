import { createRouter, createWebHistory } from "vue-router";
import StationaryCombustion from "./components/ScopeStionaryCombustion.vue";
// import MobileCombustion from "@/components/MobileCombustion.vue";
// import FugitiveEmissionAC from "@/components/FugitiveEmissionAC.vue";
// import FugitiveEmissionFireExt from "@/components/FugitiveEmissionFireExt.vue";

const routes = [
  { path: "/", redirect: "/stationary-combustion" }, // Redirect to a default category
  { path: "/stationary-combustion", component: StationaryCombustion },
  //   { path: "/mobile-combustion", component: MobileCombustion },
  //   { path: "/fugitive-emission-ac", component: FugitiveEmissionAC },
  //   { path: "/fugitive-emission-fire-ext", component: FugitiveEmissionFireExt },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
