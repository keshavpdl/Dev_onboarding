<template>
  <div class="heading">
    <!-- <button @click="show" class="addOrganization">Add Organization</button> -->
    <div class="tab-title">
      <h1 v-if="currentUser.profile.role == 'KeelaAdmin'">Organizations {{ this.$store.getters.getOrganization.name }}</h1>
    </div>
    <div class="content-body">
      <div
        v-if="currentUser.profile.role == 'keelaAdmin'"
        class="keela-admin-section"
      >
        <AddOrganizationForm />
        <ul class="organizations-list">
          <h3>Select Organization</h3>
          <li
            v-for="organization in organizations"
            v-bind:key="organization._id"
          >
            <button @click="setOrganization(organization)">
              {{ organization.name }}
            </button>
          </li>
        </ul>
      </div>
      <h3>Users list</h3>
      <div class="users-count">Total Users: {{ users.length }}</div>
      <!-- <ul class="users-list">
        <li v-for="user in users" v-bind:key="user._id">
          {{ user.username }} Role: {{ user.profile.role }}
          <button
            v-if="currentUser.profile.role == 'Admin'"
            @click="deleteUser(user._id)"
          >
            ❌
          </button>
        </li>
      </ul> -->
      <table class="user-table">
      <thead>
        <tr>
          <th>User Name</th>
          <th>Role</th>
          <th>Address</th>
          <th>Phone</th>
          <th v-if="currentUser.profile.role == 'Admin'">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user) in paginatedUsers" :key="user._id">
          <td>{{ user.username }}</td>
          <td>{{ user.profile.role }}</td>
          <td>{{ user.profile.phone }}</td>
          <td>{{ user.profile.address }}</td>
          <td>
            <button @click="editUser(user)" class="edit-user-button" v-if="currentUser.profile.role == 'Admin'">Edit</button>
            <button @click="deleteUser(user._id)" class="delete-user-button" v-if="currentUser.profile.role == 'Admin'">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

      <div class="addUserSection"> //TODO
        <AddUserForm />
      </div>
    </div>
  </div>
</template>
<script>
import AddOrganizationForm from "./forms/AddOrganizationForm.vue";
import { OrganizationsCollection } from "../../db/OrganizationsCollection";
import AddUserForm from "./forms/AddUserForm.vue";
import { Meteor } from "meteor/meteor";
export default {
  name: "OrganizationsTab",
  components: {
    AddOrganizationForm,
    AddUserForm,
  },
  data() {
    return { 
      organizationId: "" ,
      currentPage: 1,
      usersPerPage: 10,
    };
    
  },
  meteor: {
    $subscribe: {
      organizations: [],
      users: [],
    },
    currentUser() {
      return Meteor.user();
    },

    organizations() {
      if (this.currentUser.profile.role === "Admin") {
        const org = OrganizationsCollection.find({
          _id: this.currentUser.profile.organizationId,
        }).fetch()[0];
        if (
          org !== undefined &&
          this.$store.getters.getOrganization.name === ""
        ) {
          this.$store.dispatch("setOrganization", org);
          //console.log(this.$store.getters.getOrganization);
        }
        return OrganizationsCollection.find({
          _id: this.currentUser.profile.organizationId,
        }).fetch();
      } else {
        return OrganizationsCollection.find(
          { userId: this.currentUser._id },
          { sort: { createdAt: -1 } }
        ).fetch();
      }
    },
    users() {
      return Meteor.users
        .find({
          "profile.organizationId": this.$store.getters.getOrganization._id,
          // "profile.role": { $ne: "keelaAdmin" },
          _id: { $ne: this.currentUser._id }, //hiding self
        })
        .fetch();
    },
  },
  computed: {
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.usersPerPage;
      const endIndex = startIndex + this.usersPerPage;
      return this.users.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.users.length / this.usersPerPage);
    },
  },
  methods: {
    setOrganization(organization) {
      this.$store.dispatch("setOrganization", organization);
      //console.table(this.$store.getters.getOrganization);
    },
    deleteUser(userId) {
      //console.log(`user ${userId} deleted`);
      Meteor.call("accounts.remove", userId);
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>
<style scoped>

.users-count {
  margin-bottom: 10px;
}

.add-user-button {
  margin-bottom: 10px;
}
.delete-user-button {
  padding: 5px 10px;
  background-color:red;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.edit-user-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.addUser {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 8px;
  border: 1px solid #ccc;
}

.user-table th {
  background-color: #f0f0f0;
}

.user-table td {
  text-align: left;
}

.cancel-button {
  background-color: #ccc;
}
</style>
