<template>
  <div class="sidebar-container">
    <div class="sidebar">
      <div class="sidebar-header">
        <h1 class="crm-title">
          <img
            src="keela-logo-full.png"
            class="logo-image"
            height="100%"
            width="50%"
          />
        </h1>
      </div>
      <ul class="sidebar-menu">
        <li>
          <router-link to="/" class="link">
            <i class="material-icons"> home </i>
            Dashboard
          </router-link>
        </li>
        <li v-if="currentUser.profile.role == 'keelaAdmin'">
          <router-link to="/organizations" class="link">
            <i class="material-icons"> corporate_fare </i>
            Organizations
          </router-link>
        </li>
        <li v-if="currentUser.profile.role =='Admin'">
          <router-link to="/users" class="link">
            <i class="material-icons"> contacts </i>
            Users
          </router-link>
        </li>
        <li>
          <router-link to="/contacts" class="link">
            <i class="material-icons"> groups </i>
            Contacts
          </router-link>
        </li>
        <li>
          <router-link to="/tags" class="link">
            <i class="material-icons"> label </i>
            Tags
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
export default {
  name: "SideBar",
  meteor: {
    $subscribe: {
      users: [],
    },
    currentUser() {
      return Meteor.user();
    },
  },
}
</script>

<style scoped>

.sidebar {
    width: 14rem;
    background-color: #9e989828;
    padding: 20px;
    position: fixed;
    left: 0;
    top: 0;
    right: 10%;
    height: 100%;
    overflow-y: auto;
  }

  .sidebar-container {
    height: 100%;
    margin-left: 240px;
  }

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.crm-title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}
.sidebar-menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.link {
  display: flex;
  align-items: center;
  padding: 10px 0;
  color: black;
  font-size: 16px;
  text-decoration: none;
}

.link:hover {
  color: #6ab500;
}

.icon {
  margin-right: 8px;
}

.router-link-exact-active {
  color: #f1f1f1;
  background-color: #7745d6;
}
</style>
