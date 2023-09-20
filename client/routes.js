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
import SideBar from "../imports/ui/components/SideBar.vue"

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: WelcomeTab,
    meta:{requiresAuth:true},
  },
  {
    path: "/organizations",
    name: "Organizations",
    component: SideBar,
    meta:{requiresAuth:true},
    children:[
      {
        path:"",
        name:"Organizations",
        component:OrganizationsTab
      }
    ]
  },
  {
    path: "/users",
    name: "Users",
    component: SideBar,
    meta:{requiresAuth:true},
    children:[
      {
        path:"",
        name:"Contents",
        component:Users
      }
    ]
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: SideBar,
    meta:{requiresAuth:true},
    children:[
      {
        path:"",
        name:"Contents",
        component:ContactsTab
      }
    ]
  },
  {
    path: "/tags",
    name: "Tags",
    component: SideBar,
    meta:{requiresAuth:true},
    children:[
      {
        path:"",
        name:"Contents",
        component:TagsTab
      }
    ]
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
    // component: () => import('../imports/ui/components/forms/LoginForm.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});
router.beforeEach((to, from, next) => {
  console.log("Route:", to.path);
  console.log("User Authenticated:", !!Meteor.userId());
  if (to.meta.requiresAuth && !Meteor.userId()) {
    next('/login');
  } else {
    next();
  }
});

export default router;