<template>
  <div class="controls">
    <modal name="addContactModal" :adaptive="true" width="400px" height="250px">
      <div class="addContactModal">
        <div class="card">
          <div class="form-header">
            <button class="close-button" @click="handleCancel">×</button>
          </div>
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
              <button type="submit" v-if="!selectedContact">Save</button>
              <button type="submit" v-else>Update</button>
              <button @click="handleCancel" type="button" class="cancel-button">Cancel</button>
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
      selectedContact: null,
    };
  },
  methods: {
    show(contact = null) {
      this.selectedContact = contact;
      this.populateFormFields();
      this.$modal.show("addContactModal");
    },
    hide() {
      this.resetForm();
      this.$modal.hide("addContactModal");
    },
    handleSubmit() {
      if (this.selectedContact) {
        Meteor.call("contacts.update", this.selectedContact._id, {
          fullname: this.fullname,
          email: this.email,
          address: this.address,
          phone: this.phone,
        });
      } else {
        Meteor.call("contacts.insert", {
          fullname: this.fullname,
          email: this.email,
          address: this.address,
          phone: this.phone,
        });
      }
      
      this.hide();
    },
    handleCancel() {
      this.hide();
    },
    populateFormFields() {
      if (this.selectedContact) {
        this.fullname = this.selectedContact.fullname;
        this.email = this.selectedContact.email;
        this.address = this.selectedContact.address;
        this.phone = this.selectedContact.phone;
      }
    },
    resetForm() {
      this.fullname = "";
      this.email = "";
      this.address = "";
      this.phone = "";
      this.selectedContact = null;
    },
  },
};
</script>


<style scoped>
.controls {
  text-align: center;
  max-width: 300px;
}

.modal{
  max-width: fit-content;
}
.addContactModal {
  display: flex;
  justify-content: center;
  align-items: center;
  /* max-width: 400px; */
  width: 100%;
  height: 100%;
}

.card {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.027);
  padding: 20px;
  width: 100%;
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
  margin-top: 2%;
}

.button-group button {
  padding: 10px 20px;
  background-color: #7745d6;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.button-group button:hover{
  background-color: #622cc9;

}
.close-button {
  border: none;
  background: transparent;
  font-size: 30px;
  color:lightcoral;
  cursor: pointer;
  margin-left: 95%;
  margin-top: -15%;
}
.cancel-button {
  background-color: #ccc;
}
</style>
