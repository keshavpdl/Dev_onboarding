<template>
  <div class="center-container">
    <div class="card">
      <div class="card-header">
        <img src="keela-logo-full.png" alt="Logo" class="logo-image" />
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div>
          <label for="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            required
            v-model="username"
          />
        </div>

        <div>
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            v-model="password"
          />
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>

        <div class="user-login">
          <button type="submit" class="login-button">
            <i class="material-icons">login</i>
            Log In
          </button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account?
            <router-link
              to="/register"
              class="font-medium text-primary-600 hover:underline dark:bg-primary-600"
              >Register here
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      props: ["organizationId"],
    };
  },
  meteor: {
    currentUser() {
      return Meteor.user();
    },
  },

  methods: {
    // handleLogin(event) {
    //   event.preventDefault();
    //   Meteor.loginWithPassword(this.username, this.password, (error) => {
    //     if (error) {
    //       this.errorMessage = "Invalid email or password.";
    //     } else {
    //       this.$router.push("/");
    //     }
    //   });
    // },
    handleLogin(event) {
  event.preventDefault();
  Meteor.loginWithPassword(this.username, this.password, (error) => {
    if (error) {
      this.errorMessage = "Invalid email or password.";
    } else {
      const token = Accounts._storedLoginToken();
      localStorage.setItem("authToken", token);
      this.$router.push("/");
    }
  });
},
  },
};
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  background-color: #ecebeb;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0.5, 0.5, 0.5, 0.1);
}

.card-header {
  color: #fff;
  width: 90%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.login-form {
  padding: 20px;
}

.login-form > div {
  margin-bottom: 16px;
}

.login-form > div > label {
  font-weight: bold;
}

.login-form > div > input {
  width: 100%;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 4px;
  font-size: 1em;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  font-size: 16px;
  background-color: #7745d6;
  color: white;
  border: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 20px;
  border-radius: 12px;
}

.login-button:hover {
  background-color: #622cc9;
}

.login-button i {
  margin-right: 8px;
  font-size: 20px;
}

.button-text {
  margin-right: 4px;
}

.user-login {
  text-align: center;
}
.logo-image {
  padding-top: 30px;
  display: block;
  width: 100%;
  height: auto;
  align-self: center;
}

.error-message {
  margin-top: 10px;
  color: #d9534f;
  text-align: center;
}
</style>