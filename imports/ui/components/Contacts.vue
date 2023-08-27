<template>
  <div class="contacts-tab">
    <h3>Contacts List</h3>
    <div class="contact-count">Total Contacts: {{ contacts.length }}</div>
    <div class="add-contact-button">
      <button
        @click="addContact"
        class="addContact"
        v-if="currentUser.profile.role == 'Admin'"
      >
        Add Contact
      </button>
    </div>
    <table class="contact-table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Tags</th>
          <th v-if="currentUser.profile.role == 'Admin'">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in paginatedContacts" :key="contact._id">
          <td>{{ contact.fullname }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.address }}</td>
          <td>{{ contact.phone }}</td>
          <td>
            <li v-for="tag in contact.tags" :key="tag">{{ tag.tagsname }}</li>
          </td>

          <td v-if="currentUser.profile.role == 'Admin'">
            <button
              @click="editContact(contact)"
              class="edit-contact-button"
              v-if="currentUser.profile.role == 'Admin'"
            >
              Edit
            </button>
            <button
              @click="deleteContact(contact._id)"
              class="delete-contact-button"
              v-if="currentUser.profile.role == 'Admin'"
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
    <AddContactForm
      ref="addContactForm"
      :organizationId="currentUser.profile.organizationId"
    />
  </div>
</template>

<script>
import { ContactsCollection } from "../../db/ContactsCollection";
import AddContactForm from "./forms/AddContactsForm.vue";

export default {
  name: "ContactsTab",
  components: {
    AddContactForm,
    props: ["organizationId"],
  },
  data() {
    return {
      currentPage: 1,
      contactsPerPage: 10,
    };
  },
  meteor: {
    $subscribe: {
      contacts: [],
      tags: [],
    },
    currentUser() {
      return Meteor.user();
    },
    contacts() {
      return ContactsCollection.find(
        { organizationId: this.currentUser.profile.organizationId },
        { sort: { createdAt: -1 } }
      );
    },
  },
  computed: {
    paginatedContacts() {
      const startIndex = (this.currentPage - 1) * this.contactsPerPage;
      const endIndex = startIndex + this.contactsPerPage;
      return this.contacts.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.contacts.length / this.contactsPerPage);
    },
  },
  methods: {
    addContact() {
      this.$refs.addContactForm.resetForm();
      this.$refs.addContactForm.show();
    },
    editContact(contact) {
      this.$refs.addContactForm.selectedContact = contact;
      this.$refs.addContactForm.populateFormFields();
      this.$refs.addContactForm.show(contact);
    },
    deleteContact(contactId) {
      Meteor.call("contacts.remove", contactId);
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
.contacts-tab {
  text-align: left;
}

.contact-count {
  margin-bottom: 10px;
}

.add-contact-button {
  margin-bottom: 10px;
}

.delete-contact-button {
  padding: 5px 10px;
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.edit-contact-button {
  padding: 5px 10px;
  background-color: #7745d6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.edit-contact-button:hover {
  background-color: #622cc9;
}

.addContact {
  padding: 10px 20px;
  background-color: #7745d6;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.add-contact:hover {
  background-color: #622cc9;
}
.contact-table {
  width: 98%;
  border-collapse: collapse;
  margin-top: auto;
  margin-bottom: auto;
}

.contact-table th,
.contact-table td {
  padding: 8px;
  border: 1px solid #ccc;
}

.contact-table th {
  background-color: #f0f0f0;
}

.contact-table td {
  text-align: left;
}

.cancel-button {
  background-color: #ccc;
}
</style>
