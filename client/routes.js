import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import OrganizationsTab from "../imports/ui/components/Organizations.vue";
import ContactsTab from "../imports/ui/components/Contacts.vue";
import TagsTab from "../imports/ui/components/Tags.vue";
import WelcomeTab from "../imports/ui/components/Welcome.vue";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: WelcomeTab,
  },
  {
    path: "/organizations",
    name: "Organizations",
    component: OrganizationsTab,
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: ContactsTab,
  },
  {
    path: "/tags",
    name: "Tags",
    component: TagsTab,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
