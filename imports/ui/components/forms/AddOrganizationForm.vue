<template>
  <div class="controls">
    <button @click="show" class="addOrganization">Add Organization</button>
    <modal name="addOrganizationModal" :adaptive="true" width="400px" height="210px">
      <div class="addOrganizationModal">
        <div class="card">
          <div class="form-header">
            <button class="close-button" @click="handleCancel">×</button>
          </div>
          <form class="organization-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="organizationName">Organization Name</label>
              <div class="input-field">
                <input
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  placeholder="Organization Name"
                  required
                  v-model="organizationName"
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
            <div class="button-group">
              <button type="submit">Save</button>
              <button type="button" @click="hide" class="cancel-button">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: "AddOrganizationForm",
  data() {
    return {
      organizationName: "",
      address: "",
      phone: "",
    };
  },
  methods: {
    show() {
      this.$modal.show("addOrganizationModal");
    },
    hide() {
      this.resetForm();
      this.$modal.hide("addOrganizationModal");
    },
    handleSubmit() {
      if (this.isValidForm()) {
        Meteor.call("organizations.insert", {
          name: this.organizationName,
          address: this.address,
          phone: this.phone,
          userId: this.currentUser._id,
        });
        this.hide();
      }
    },
    handleCancel() {
      this.hide();
    },
    resetForm() {
      this.organizationName = "";
      this.phone = "";
      this.address = "";
    },
    // isValidForm() {
    //   // Implement validation logic for the form inputs
    //   // Return true if the form is valid, or false otherwise
    // },
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

.addOrganizationModal {
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

.organization-form .form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.organization-form .form-group label {
  width: 100px;
  text-align: right;
  padding-right: 10px;
}

.organization-form .form-group .input-field {
  flex: 1;
}

.organization-form .form-group .input-field input[type="text"],
.organization-form .form-group .input-field input[type="tel"] {
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
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.close-button {
  border: none;
  background: transparent;
  font-size: 30px;
  color: lightcoral;
  cursor: pointer;
  margin-left: 95%;
  margin-top: -15%;
}
.cancel-button {
  background-color: #ccc;
}
</style>
