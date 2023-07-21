<template>
  <div class="controls">
    <modal name="addTagModal" :adaptive="true" width="400px" height="200px">
      <div class="addTagModal">
        <div class="card">
          <div class="form-header">
            <button class="close-button" @click="handleCancel">×</button>
          </div>
          <form class="tag-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="fullName">Tags Name</label>
              <div class="input-field">
                <input
                  id="tagsname"
                  name="tagsname"
                  type="text"
                  placeholder="Tags Name"
                  required
                  v-model="tagsname"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <div class="input-field">
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Description"
                  required
                  v-model="description"
                ></textarea>
              </div>
            </div>
            <div class="button-group">
              <button type="submit" v-if="!selectedTag">Save</button>
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
      tagsname: "",
      description: "",
      selectedTag: null,
    };
  },
  methods: {
    show(tags = null) {
      this.selectedTag = tags;
      this.populateFormFields();
      this.$modal.show("addTagModal");
    },
    hide() {
      this.resetForm();
      this.$modal.hide("addTagModal");
    },
    handleSubmit() {
      if (this.selectedTag) {
        Meteor.call("tags.update", this.selectedTag._id, {
          tagsname: this.tagsname,
          description: this.description,
        });
      } else {
        Meteor.call("tags.insert", {
          tagsname: this.tagsname,
          description: this.description,
        });
      }

      this.hide();
    },
    handleCancel() {
      this.hide();
    },
    populateFormFields() {
      if (this.selectedTag) {
        this.tagsname = this.selectedTag.tagsname;
        this.description = this.selectedTag.description;
      }
    },
    resetForm() {
      this.tagsname = "";
      this.description = "";
      this.selectedTag = null;
    },
  },
};
</script>

<style scoped>
.controls {
  text-align: center;
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
  /* height: fit-content; */
  height: 100%;
  width: 100%;
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

.tag-form .form-group .input-field input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.tag-form .form-group .input-field textarea {
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
.close-button {
  border: none;
  background: transparent;
  font-size: 30px;
  color:lightcoral;
  cursor: pointer;
  margin-left: 95%;
  margin-top: -15%;
}
</style>