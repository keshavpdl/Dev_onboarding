<template>
  <div class="app">
    <div class="body">
      <LoginForm v-if="!currentUser" />
      <div v-else class="main">
        <div class="side-bar">
          <SideBar />
          <div class="content">
            <div class="user-logout" @click="logout">
              <button>
                {{ currentUser.username }}
                <i class="material-icons">exit_to_app</i>
              </button>
            </div>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "./components/forms/LoginForm.vue";
import SideBar from "./components/SideBar.vue";
import { Meteor } from "meteor/meteor";

export default {
  components: {
    LoginForm,
    SideBar,
  },
  meteor: {
    currentUser() {
      return Meteor.user();
    },
  },
  methods: {
    logout() {
      Meteor.logout();
      if (this.$route.fullPath != "/") {
        this.$router.replace("/");
      }
    },
  },
};
</script>

<style scoped>
.user-logout {
  position: absolute;
  top: 20px;
  right: 20px;
}

.user-logout button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-size: 16px;
  background-color: #62807e;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-logout button:hover {
  background-color: #3f5d5b;
}

.user-logout i {
  margin-right: 8px;
  font-size: 20px;
}
</style>