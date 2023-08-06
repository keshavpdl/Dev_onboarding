<template>
  <div class="organization-tab">
    <h2>
      <div class="organization-count">
        Total Organizations: {{ organizations.length }}
      </div>
    </h2>
    <!-- <button @click="show" class="addOrganization">Add Organization</button> -->
    <div class="add-organization-button">
      <button @click="addOrganization" class="addOrganization">Add Organization</button>
    </div>
    <h2>Select Organization From Table</h2>
    <div class="organization-name">
      <h3 v-if="currentUser.profile.role == 'keelaAdmin'">
        Current Organization: {{ this.$store.getters.getOrganization.organizationName }}
      </h3>
    </div>
    <div class="content-body">
      <div
        v-if="currentUser.profile.role == 'keelaAdmin'"
        class="keela-admin-section"
      >
        <AddOrganizationForm />
        <!-- <ul class="organizations-list"> -->
          <table class="organization-table">
            <tr>
              <th>Organization Name</th>
              <th>Actions</th>
              <!-- <th>Associated Users</th> -->
            </tr>
            <tr
              v-for="organization in organizations"
              v-bind:key="organization._id"
            >
              <td>
                <button
                  class="set-organization-button"
                  @click="setOrganization(organization)"
                >
                  {{ organization.name}}
                </button>
              </td>
              <!-- <td>{{ users.length }}</td> -->
              <td>
                <button
                  @click="editOrganization(organization)"
                  class="edit-organization-button"
                >
                  Edit
                </button>
                <button
                  @click="deleteOrganization(organization._id)"
                  class="delete-organization-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          </table>
          <!-- <div class="pagination">
            <button @click="goToPreviousPage" :disabled="currentPage === 1">
              Previous
            </button>
            <button
              @click="goToNextPage"
              :disabled="currentPage === totalPages"
            >
              Next
            </button>
          </div> -->

          <!-- <li
            v-for="organization in organizations"
            v-bind:key="organization._id"
          >
            <button @click="setOrganization(organization)">
              {{ organization.name }}
            </button>
          </li> -->
        <!-- </ul> -->
      </div>
      <div class="users">
        <UsersTab />
      </div>

    </div>
    <AddOrganizationForm ref="addOrganizationForm" />
  </div>
</template>
<script>
import AddOrganizationForm from "./forms/AddOrganizationForm.vue";
import { OrganizationsCollection } from "../../db/OrganizationsCollection";
import UsersTab from "./Users.vue";
import { Meteor } from "meteor/meteor";
export default {
  name: "OrganizationsTab",
  components: {
    AddOrganizationForm,
    UsersTab,
  },
  data() {
    return {
      organizationId: "",
      currentPage: 1,
      organizationsPerPage: 10,
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
          this.$store.getters.getOrganization.organizationName === ""
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
    // users() {
    //   return Meteor.users
    //     .find({
    //       "profile.organizationId": this.$store.getters.getOrganization._id,
    //       // "profile.role": { $ne: "keelaAdmin" },
    //       _id: { $ne: this.currentUser._id }, //hiding self
    //     })
    //     .fetch();
    // },
  },
  // computed: {
  //   organizations() {
  //     const startIndex = (this.currentPage - 1) * this.organizationsPerPage;
  //     const endIndex = startIndex + this.organizationsPerPage;
  //     return this.users.slice(startIndex, endIndex);
  //   },
  //   totalPages() {
  //     return Math.ceil(this.organizations.length / this.organizationsPerPage);
  //   },
  // },
  methods: {
    setOrganization(organization) {
      this.$store.dispatch("setOrganization", organization);
      //console.table(this.$store.getters.getOrganization);
    },
    addOrganization() {
      this.$refs.addOrganizationForm.resetForm();
      this.$refs.addOrganizationForm.show();
    },
    deleteOrganization(organizationId) {
      //console.log(`user ${userId} deleted`);
      Meteor.call("organizations.remove", organizationId);
    },
    editOrganization(organization) {
      this.$refs.addOrganizationForm.selectedOrganization = organization;
      this.$refs.addOrganizationForm.populateFormFields();
      this.$refs.addOrganizationForm.show(organization);
    },
    // goToPreviousPage() {
    //   if (this.currentPage > 1) {
    //     this.currentPage--;
    //   }
    // },
    // goToNextPage() {
    //   if (this.currentPage < this.totalPages) {
    //     this.currentPage++;
    //   }
    // },
  },
};
</script>
<style scoped>
.organization-count {
  margin-bottom: 10px;
  text-size-adjust: 20px;
}
.set-organization-button {
  border-radius: 0px;
  background-color: white;
  border-color: white;
  cursor: pointer;
}

.addOrganization {
  padding: 10px 20px;
  background-color: #7745d6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.addOrganization:hover{
  background-color: #622cc9;

}
.add-organization-button {
  margin-bottom: 10px;
}
.delete-organization-button {
  padding: 5px 10px;
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.edit-organization-button {
  padding: 5px 10px;
  background-color: #7745d6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.edit-organization-button:hover {
  background-color: #622cc9;
}

.organization-table {
  width: 98%;
  border-collapse: collapse;
}
.organization-table th,
.organization-table td {
  padding: 8px;
  border: 1px solid #ccc;
}

.organization-table th {
  background-color: #f0f0f0;
}

.organization-table td {
  text-align: left;
}

.cancel-button {
  background-color: #ccc;
}
</style>
