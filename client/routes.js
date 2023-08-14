import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import OrganizationsTab from "../imports/ui/components/Organizations.vue";
import ContactsTab from "../imports/ui/components/Contacts.vue";
import TagsTab from "../imports/ui/components/Tags.vue";
import WelcomeTab from "../imports/ui/components/Welcome.vue";
// import Register from "../imports/ui/components/Register.vue"
import LoginForm from "../imports/ui/components/forms/LoginForm.vue"
import Users from "../imports/ui/components/Users.vue"

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
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: Register,
  // },
  {
    path: "/login", // Add a new route for the login form
    name: "Login",
    component: LoginForm,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
