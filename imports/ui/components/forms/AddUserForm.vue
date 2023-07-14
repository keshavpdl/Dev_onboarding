<!-- <template>
  <div class="controls">
    <button @click="show" class="addUser">Add User</button>
    <modal name="addUserModal">
      <div class="addUserModal">
        <form class="login-form" @submit.prevent="handleSubmit">
          <div class="input-field">
            <label for="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              required
              v-model="username"
            />
          </div>

          <div class="input-field">
            <label for="password">Password</label>
            <input
              id="password"
              name="password"
              type="text"
              placeholder="password"
              required
              v-model="password"
            />
          </div>

          <div class="input-field">
            <label for="role">Role</label>
            <input
              id="role"
              name="role"
              type="text"
              placeholder="role"
              required
              v-model="role"
            />
          </div>

          <div class="input-field">
            <label for="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Address"
              required
              v-model="address"
            />
          </div>

          <div class="input-field">
            <label for="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone"
              required
              v-model="phone"
            />
          </div>

          <div>
            <button type="submit">Add</button>
          </div>
          <button @click="hide" class="close-modal-button">Close</button>
        </form>
      </div>
    </modal>
  </div>
</template>
<script>
export default {
  name: "AddUserForm",
  data() {
    return {
      username: "",
      password: "",
      role: "",
      address: "",
      phone: "",
    };
  },
  meteor: {
    currentUser() {
      return Meteor.user();
    },
  },
  methods: {
    show() {
      this.$modal.show("addUserModal");
    },
    hide() {
      this.$modal.hide("addUserModal");
    },
    handleSubmit(event) {
      Meteor.call("accounts.insert", {
        username: this.username,
        password: this.password,
        profile: {
          role: this.role,
          address: this.address,
          phone: this.phone,
          organizationId: this.$store.getters.getOrganization._id,
        },
      });
      this.hide();
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

.addUserModal {
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

.login-form .form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.login-form .form-group label {
  width: 100px;
  text-align: right;
  padding-right: 10px;
}

.login-form .form-group .input-field {
  flex: 1;
}

.login-form .form-group .input-field input[type="text"] {
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
</style> -->

<template>
  <div class="controls">
    <button @click="show" class="addUser">Add User</button>
    <modal name="addUserModal" :adaptive="true" width="400px" height="300px">
      <div class="addUserModal">
        <div class="card">
          <div class="form-header">
            <button class="close-button" @click="handleCancel">×</button>
          </div>
          <form class="user-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="username">Username</label>
              <div class="input-field">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                required
                v-model="username"
              />
              </div>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-field">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                v-model="password"
              />
              </div>
            </div>

            <div class="form-group">
              <label for="role">Role</label>
              <div class="input-field">
              <input
                id="role"
                name="role"
                type="text"
                placeholder="Role"
                required
                v-model="role"
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
                  type="text"
                  placeholder="phone"
                  required
                  v-model="phone"
                />
              </div>
            </div>

            <div class="button-group">
              <button type="submit">Add</button>
              <button @click="hide" class="cancel-button">Close</button>
            </div>
          </form>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: "AddUserForm",
  data() {
    return {
      username: "",
      password: "",
      role: "",
      address: "",
      phone: "",
    };
  },
  meteor: {
    currentUser() {
      return Meteor.user();
    },
  },
  methods: {
    show() {
      this.$modal.show("addUserModal");
    },
    hide() {
      this.$modal.hide("addUserModal");
    },
    handleSubmit(event) {
      Meteor.call("accounts.insert", {
        username: this.username,
        password: this.password,
        profile: {
          role: this.role,
          address: this.address,
          phone: this.phone,
          organizationId: this.$store.getters.getOrganization._id,
        },
      });
      this.hide();
    },
    handleCancel() {
      this.hide();
    },
  },
};
</script>

<style scoped>
.controls {
  text-align: center;
  max-width: 300px;
}

.modal {
  max-width: fit-content;
}
.addUserModal {
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

.user-form .form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.user-form .form-group label {
  width: 100px;
  text-align: right;
  padding-right: 10px;
}

.user-form .form-group .input-field {
  flex: 1;
}

.user-form .form-group .input-field input[type="text"],
.user-form .form-group .input-field input[type="password"] {
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

