<template>
  <div class="users-tab">
    <h3>Users list</h3>
    <div class="users-count">Total Users: {{ users.length }}</div>
    <div class="add-user-button">
      <button @click="addUser" class="addUser">Add Users</button>
    </div>
    <table class="user-table">
      <thead>
        <tr>
          <th>User Name</th>
          <th>Role</th>
          <th>Address</th>
          <th>Phone</th>
          <!-- <th v-if="currentUser.profile.role == 'keelaAdmin'">Organization</th> -->
          <th v-if="currentUser.profile.role !== 'keelaAdmin'">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user._id">
          <td>{{ user.username }}</td>
          <td>{{ user.profile.role }}</td>
          <td>{{ user.profile.address }}</td>
          <td>{{ user.profile.phone }}</td>
          <!-- <td v-if="currentUser.profile.role == 'keelaAdmin'">
            {{ currentUser.profile.getOrganization }}
          </td> -->
          <td v-if="currentUser.profile.role !== 'keelaAdmin'">
            <button
              @click="editUser(user)"
              class="edit-user-button"
              v-if="currentUser.profile.role == 'Admin'"
            >
              Edit
            </button>
            <button
              @click="deleteUser(user._id)"
              class="delete-user-button"
              v-if='currentUser.profile.role === "Admin" && user._id !== currentUser._id'
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="goToPreviousPage" :disabled="currentPage === 1">
        Previous
      </button>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
    <AddUserForm ref="addUserForm" />
  </div>
</template>
<script>
import AddUserForm from "./forms/AddUserForm.vue";
import { Meteor } from "meteor/meteor";
export default {
  name: "UsersTab",
  components: {
    AddUserForm,
  },
  data() {
    return {
      organizationId: "",
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
    users() {
      return Meteor.users
        .find({
          "profile.organizationId": this.$store.getters.getOrganization._id,
          // "profile.role": { $ne: "keelaAdmin" },
          // _id: { $ne: this.currentUser._id }, //hiding self
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
    addUser() {
      this.$refs.addUserForm.resetForm();
      this.$refs.addUserForm.show();
    },
    deleteUser(userId) {
      //console.log(`user ${userId} deleted`);
      Meteor.call("accounts.remove", userId);
    },
    editUser(user) {
      this.$refs.addUserForm.selectedUser = user;
      this.$refs.addUserForm.populateFormFields();
      this.$refs.addUserForm.show(user);
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
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.edit-user-button {
  padding: 5px 10px;
  /* background-color: #007bff; */
  background-color: #7745d6;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.edit-user-button:hover{
  background-color: #622cc9;  

}
.addUser {
  padding: 10px 20px;
  /* background-color: #007bff; */
  background-color: #7745d6;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.addUser:hover{
  background-color: #622cc9;
}
.user-table {
  width: 98%;
  border-collapse: collapse;
  margin-top:5px;
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
