<template>
  <div class="center-container">
    <div class="card">
      <div class="card-header">
        <img src="keela-logo-full.png" alt="Logo" class="logo-image" />
        <h2>Welcome to Keela</h2>
      </div>

      <form class="login-form" @submit.prevent="handleSubmit">
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
        </div>

        <div class="user-login">
          <button type="submit" class="login-button">
            <i class="material-icons">login</i>
            Log In
          </button>
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
    };
  },
  methods: {
    handleSubmit(event) {
      // to reset the route at logout
      if (this.$route.fullPath != "/") {
        this.$router.replace("/");
      }
      Meteor.loginWithPassword(this.username, this.password);
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
  width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  /* background-color: #315481; */
  color: #fff;
  padding: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-header h2 {
  margin: 0;
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
  width: 100%; /* Set the width to 100% */
  height: 30px;
  font-size: 16px;
  background-color: #62807e;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #3f5d5b;
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
  display: block;
  width: 100%;
  height: auto;
}

</style>