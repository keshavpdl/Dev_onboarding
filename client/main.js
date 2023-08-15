import Vue from "vue";

import "../imports/ui/plugins";

import App from "../imports/ui/App.vue";
import router from "./routes";
import { store } from "../imports/ui/store/store";
// import Toast from "vue-toastification";
// import "vue-toastification/dist/index.css";

// Vue.use(Toast, {
//   // Global toast configuration options
//   position: "top-right",
//   timeout: 3000,
//   closeOnClick: true,
//   pauseOnFocusLoss: true,
//   draggable: true,
//   draggablePercent: 0.6,
//   showCloseButtonOnHover: true,
//   hideProgressBar: false,
//   closeButton: "button",
// });

Meteor.startup(() => {
  new Vue({
    el: "#app",
    store,
    router,
    ...App,
  });
});
