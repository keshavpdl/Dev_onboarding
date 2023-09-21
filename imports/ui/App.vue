<template>
  <div class="app">
    <div class="body">
      <!-- <LoginForm v-if="!currentUser && $route.path =='/'" />
      <Register v-if="!currentUser && $route.path =='/register'" /> -->
      <!-- <div class="side-bar"> -->
      <!-- <SideBar v-if="currentUser" /> -->
    <div class="user-logout" @click="logout">
            <button v-if="currentUser">
              {{ currentUser.username }}
              <i class="material-icons">exit_to_app</i>
            </button>
          </div>
      <router-view></router-view>
    </div>
    </div>
  <!-- </div> -->
</template>

<script>
import LoginForm from "./components/forms/LoginForm.vue";
import SideBar from "./components/SideBar.vue";
import Register from "./components/forms/Register.vue";

export default {
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
  methods: {
    logout() {
    Meteor.logout((error) => {
    if (!error) {
      localStorage.removeItem("authToken");
      this.$router.replace("/login");
    }
    });

    },
    performLogout() {
      if (this.currentUser) {
        Meteor.logout();
      }
    }
  },
  mounted() {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    // Re-authenticate the user using the stored token
    Meteor.loginWithToken(authToken, (error) => {
      if (error) {
        console.error("Authentication error:", error);
        // Handle authentication error (e.g., redirect to login)
      } else {
        // Set the authenticated user
        this.currentUser = Meteor.user();
      }
    });
  }
},

  // beforeDestroy() {
  //   // Remove the event listener to prevent memory leaks
  //   window.removeEventListener("beforeunload", this.performLogout);
  // }
};
</script>
<style scoped>
.user-logout {
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
}
</style>

