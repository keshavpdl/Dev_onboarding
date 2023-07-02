<template>
  <div class="welcome-tab">
    <h1 class="welcome-text">Welcome, {{ currentUser.username }}!</h1>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";

export default {
  name: "WelcomeTab",
  meteor: {
    currentUser() {
      return Meteor.user();
    },
  },
};
</script>

<style scoped>

.welcome-text {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
