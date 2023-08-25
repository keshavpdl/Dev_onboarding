<template>
  <div class="center-container">
    <div class="card">
      <div class="card-header">
        <img src="keela-logo-full.png" alt="Logo" class="logo-image" />
      </div>

      <form class="user-form" @submit.prevent="handleSubmit">
        <!-- <div class="form-group"> -->
          <div>
            <label for="username">Username</label>
            <!-- <div class="input-field"> -->
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                required
                v-model="username"
              />
            <!-- </div> -->
          <!-- </div> -->
          </div>
          <div>
            <!-- <div class="form-group"> -->
              <label for="password">Password</label>
              <!-- <div class="input-field"> -->
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  v-model="password"
                />
              <!-- </div> -->
            <!-- </div> -->
          </div>
          <div>
            <!-- <div class="form-group"> -->
              <label for="role">Role</label>
              <!-- <div class="input-field"> -->
                <select v-model="role" required>
                  <option
                    v-for="roleOption in roles"
                    :key="roleOption"
                    :value="roleOption"
                  >
                    {{ roleOption }}
                  </option>
                </select>
              <!-- </div> -->
            <!-- </div> -->
          </div>
          <div>
            <!-- <div class="form-group"> -->
              <label for="address">Address</label>
              <!-- <div class="input-field"> -->
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  required
                  v-model="address"
                />
              <!-- </div> -->
            <!-- </div> -->
          </div>
          <div>
            <!-- <div class="form-group"> -->
              <label for="phone">Phone</label>
              <!-- <div class="input-field"> -->
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="phone"
                  required
                  v-model="phone"
                />
              <!-- </div> -->
            <!-- </div> -->
          </div>
        <div class="user-register">
          <button type="submit" class="register-button">Register</button>
        </div>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?
          <router-link
            to="/"
            class="font-medium text-primary-600 hover:underline dark:bg-primary-600"
            >Login
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      role: "",
      roles: ["Admin", "Coordinator", "keelaAdmin"],
      address: "",
      phone: "",
      organizationId: "",
      errorMessage: "",
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
  },
  methods: {
    handleSubmit() {
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
      // if (!error) {
      //       this.$toast.success(`${this.username} logged in successfully`);
      //     }
          this.$router.push("/");
      // this.$toast.success("User Registered successfully");
    },

    handleCancel() {
      this.hide();
    },
    resetForm() {
      this.username = "";
      this.password = "";
      this.role = "";
      this.address = "";
      this.phone = "";
      this.selectedUser = null;
    },
  },
};
</script>
  
  <style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  width: 400px;
  background-color: #ecebeb;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0.5, 0.5, 0.5, 0.1);
}

.card-header {
  color: #fff;
  width: 90%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.card-header {
  color: #fff;
  width: 90%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.user-form {
  padding: 20px;
}

.user-form > div {
  margin-bottom: 16px;
}

.user-form > div > label {
  font-weight: bold;
}

.user-form > div > input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 4px;
  font-size: 1em;
}

.register-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* Set the width to 100% */
  height: 40px;
  font-size: 16px;
  background-color: #7745d6;
  color: white;
  border: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 20px;
  border-radius: 12px;
}

.register-button:hover {
  background-color: #622cc9;
}

.register-button i {
  margin-right: 8px;
  font-size: 20px;
}

.user-register {
  text-align: center;
}
</style>