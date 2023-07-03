<!-- <template>
  <div class="contacts-tab">
    <h3>Contacts List</h3>
    <div class="contact-count">Total Contacts: {{ contacts.length }}</div>
    <div class="add-contact-button">
      <button @click="show" class="addContact">Add Contact</button>
    </div>
    <table class="contact-table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" v-bind:key="contact._id">
          <td>{{ contact.fullname }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.address }}</td>
          <td>{{ contact.phone }}</td>
          <td>
            <button @click="editContact(contact)">Edit</button>
            <button @click="deleteContact(contact._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <AddContactsForm />
  </div>
</template> -->

<!-- <script>
import { ContactsCollection } from "../../db/ContactsCollection";
import AddContactsForm from "./AddContactsForm.vue";

export default {
  name: "ContactsTab",
  components: {
    AddContactsForm,
  },
  meteor: {
    $subscribe: {
      contacts: [],
    },
    currentUser() {
      return Meteor.user();
    },
    contacts() {
      return ContactsCollection.find({}, { sort: { createdAt: -1 } });
    },
  },
  methods: {
    show() {
      this.$modal.show("addContactModal");
    },
    editContact(contact) {
      this.selectedContact = contact; // Set selectedContact
      this.$modal.show("addContactModal");
    },
    deleteContact(contactId) {
      Meteor.call("contacts.remove", contactId);
    },
  },
};
</script> -->
<!-- <style scoped>
.contacts-tab {
  text-align: left;
}

.contact-count {
  margin-bottom: 10px;
}

.add-contact-button {
  margin-bottom: 10px;
}

.addContact {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.contact-table {
  width: 100%;
  border-collapse: collapse;
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

.contact-table button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  background-color: #ccc;
}
</style> -->

<!-- <template>
  <div class="contacts-tab">
    <h3>Contacts List</h3>
    <div class="contact-count">Total Contacts: {{ contacts.length }}</div>
    <div class="add-contact-button">
      <button @click="addContact" class="addContact">Add Contact</button>
    </div>
    <table class="contact-table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" v-bind:key="contact._id">
          <td>{{ contact.fullname }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.address }}</td>
          <td>{{ contact.phone }}</td>
          <td>
            <button @click="editContact(contact)">Edit</button>
            <button @click="deleteContact(contact._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <AddContactForm ref="addContactForm" />
  </div>
</template> -->

<!-- <script>
import { ContactsCollection } from "../../db/ContactsCollection";
import AddContactForm from "./AddContactsForm.vue";

export default {
  name: "ContactsTab",
  components: {
    AddContactForm,
  },
  meteor: {
    $subscribe: {
      contacts: [],
    },
    currentUser() {
      return Meteor.user();
    },
    contacts() {
      return ContactsCollection.find({}, { sort: { createdAt: -1 } });
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
  },
};
</script> -->


<template>
  <div class="contacts-tab">
    <h3>Contacts List</h3>
    <div class="contact-count">Total Contacts: {{ contacts.length }}</div>
    <div class="add-contact-button">
      <button @click="addContact" class="addContact">Add Contact</button>
    </div>
    <table class="contact-table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(contact) in paginatedContacts" :key="contact._id">
          <td>{{ contact.fullname }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.address }}</td>
          <td>{{ contact.phone }}</td>
          <td>
            <button @click="editContact(contact)">Edit</button>
            <button @click="deleteContact(contact._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="goToPreviousPage" :disabled="currentPage === 1">Previous</button>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
    <AddContactForm ref="addContactForm" />
  </div>
</template>

<script>
import { ContactsCollection } from "../../db/ContactsCollection";
import AddContactForm from "./forms/AddContactsForm.vue"

export default {
  name: "ContactsTab",
  components: {
    AddContactForm,
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
    },
    currentUser() {
      return Meteor.user();
    },
    contacts() {
      return ContactsCollection.find({}, { sort: { createdAt: -1 } });
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

.addContact {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.contact-table {
  width: 100%;
  border-collapse: collapse;
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

.contact-table button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  background-color: #ccc;
}
</style>
