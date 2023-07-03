<!-- <template>
    <div class="controls">
      <modal name="addTagModal" :adaptive="true">
        <div class="addTagModal">
          <div class="card">
            <form class="tag-form" @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name">Tag Name</label>
                <div class="input-field">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    required
                    v-model="name"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <div class="input-field">
                  <input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Full Name"
                    required
                    v-model="description"
                  />
                </div>
              </div>
              <div class="button-group">
                <button type="submit" v-if="!selectedtag">Save</button>
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
    name: "AddTagForm",
    data() {
      return {
        name: "",
        description: "",
        selectedtag: null,
      };
    },
    methods: {
      show(tag = null) {
        this.selectedtag = tag;
        this.populateFormFields();
        this.$modal.show("addTagModal");
      },
      hide() {
        this.resetForm();
        this.$modal.hide("addTagModal");
      },
      handleSubmit() {
        if (this.selectedtag) {
          Meteor.call("tags.update", this.selectedtag._id, {
            name: this.name,
            address: this.address,
          });
        } else {
          Meteor.call("tags.insert", {
            name: this.name,
            address: this.address,
          });
        }
        
        this.hide();
      },
      handleCancel() {
        this.hide();
      },
      populateFormFields() {
        if (this.selectedtag) {
          this.name = this.selectedtag.name;
          this.address = this.selectedtag.address;
          this.phone = this.selectedtag.phone;
        }
      },
      resetForm() {
        this.name = "";
        this.address = "";
        this.selectedtag = null;
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
  
  .addTagModal {
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
  
  .tag-form .form-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .tag-form .form-group label {
    width: 100px;
    text-align: right;
    padding-right: 10px;
  }
  
  .tag-form .form-group .input-field {
    flex: 1;
  }
  
  .tag-form .form-group .input-field input[type="text"]{
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