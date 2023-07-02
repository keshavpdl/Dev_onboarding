<template>
  <div class="controls">
    <modal name="addContactModal" :adaptive="true">
      <div class="addContactModal">
        <div class="card">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="fullName">Full Name</label>
              <div class="input-field">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  required
                  v-model="fullname"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <div class="input-field">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  v-model="email"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <div class="input-field">
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  required
                  v-model="address"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <div class="input-field">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  required
                  v-model="phone"
                />
              </div>
            </div>
            <div class="button-group">
              <button type="submit">{{ selectedContact ? 'Update' : 'Save' }}</button>
              <button @click="handleCancel" class="cancel-button">Cancel</button>            
            </div>
          </form>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
export default {
  name: "AddContactForm",
  data() {
    return {
      fullname: "",
      email: "",
      address: "",
      phone: "",
      selectedContact: null, // Added selectedContact data property
    };
  },
  methods: {
    show() {
      this.$modal.show("addContactModal");
    },
    hide() {
      // Clear form fields on modal hide
      this.resetForm();
      this.$modal.hide("addContactModal");
    },
    handleSubmit(event) {
      if (this.selectedContact) {
        // Update existing contact
        Meteor.call("contacts.update", this.selectedContact._id, {
          fullname: this.fullname,
          email: this.email,
          address: this.address,
          phone: this.phone,
        });
      } else {
        // Insert new contact
        Meteor.call("contacts.insert", {
          fullname: this.fullname,
          email: this.email,
          address: this.address,
          phone: this.phone,
        });
      }
      
      // Clear form fields after saving
      this.resetForm();
      this.hide();
    },
    handleCancel() {
      // Clear form fields on cancel
      this.resetForm();
      this.hide();
    },
    resetForm() {
      this.fullname = "";
      this.email = "";
      this.address = "";
      this.phone = "";
      this.selectedContact = null; // Reset selectedContact
    },
  },
};
</script>
<style scoped>
.controls {
  text-align: center;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.addContactModal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: fit-content;
  max-width: 100%;
}

.contact-form .form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.contact-form .form-group label {
  width: 100px;
  text-align: right;
  padding-right: 10px;
}

.contact-form .form-group .input-field {
  flex: 1;
}

.contact-form .form-group .input-field input[type="text"],
.contact-form .form-group .input-field input[type="email"],
.contact-form .form-group .input-field input[type="tel"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.button-group button {
  padding: 10px 20px;
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
