<template>
  <div class="welcome-tab">
    <h1 class="welcome-text">Welcome To Keela</h1>
    <div class="main">
      <div class="side-bar">
          <SideBar v-if="currentUser" />
          <!-- <div class="content">
            <div class="user-logout" @click="logout">
              <button v-if="currentUser">
                {{ currentUser.username }}
                <i class="material-icons">exit_to_app</i>
              </button>
            </div>
            <router-view></router-view>
          </div> -->
        </div>
      </div>
      </div>
</template>

<script>
import LoginForm from "../components/forms/LoginForm.vue";
import SideBar from "../components/SideBar.vue";
import Register from "../components/forms/Register.vue";

export default {
  name: "WelcomeTab",
  components: {
    LoginForm,
    SideBar,
    Register
  },
  meteor: {
    $subscribe: {
      users: []
    },
    currentUser() {
      return Meteor.user();
    }
  },
//   methods: {
//     logout() {
//       Meteor.logout((error) => {
//       if (!error) {
//         this.$router.replace("/login");
//       }
//     });

//     },
//     performLogout() {
//       if (this.currentUser) {
//         Meteor.logout();
//       }
//     }
//   },
//   mounted() {
//     // Add an event listener for the beforeunload event
//     window.addEventListener("beforeunload", this.performLogout);
//   },
//   beforeDestroy() {
//     // Remove the event listener to prevent memory leaks
//     window.removeEventListener("beforeunload", this.performLogout);
//   }
};
</script>

<style scoped>

.welcome-text {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  padding-top:20px;
  align-self: center;
}
/* .user-logout {
  position: absolute;
  top: 10px;
  right: 10px;
}

.user-logout button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-size: 18px;
  background-color: #7745d6;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 12px;
}

.user-logout button:hover {
  background-color: #622cc9;
}

.user-logout i {
  margin-right: 8px;
  font-size: 20px;
} */
</style>
