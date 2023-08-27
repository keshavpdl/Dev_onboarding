import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import OrganizationsTab from "../imports/ui/components/Organizations.vue";
import ContactsTab from "../imports/ui/components/Contacts.vue";
import TagsTab from "../imports/ui/components/Tags.vue";
import WelcomeTab from "../imports/ui/components/Welcome.vue";
import Register from "../imports/ui/components/forms/Register.vue"
import LoginForm from "../imports/ui/components/forms/LoginForm.vue"
import Users from "../imports/ui/components/Users.vue"

const routes = [
  {
    path: "/welcome",
    name: "Welcome",
    component: WelcomeTab,
  },
  {
    path: "/organizations",
    name: "Organizations",
    component: OrganizationsTab,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
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
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresLogin: false }
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
    meta: { requiresLogin: false }
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;