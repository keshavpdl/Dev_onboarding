<template>
  <div class="tags-tab">
    <h3>Tags List</h3>
    <div class="tag-count">Total Tags: {{ tags.length }}</div>
    <div class="add-tags-button">
      <button @click="addTag" class="addTag">Add Tag</button>
    </div>
    <table class="tag-table">
      <thead>
        <tr>
          <th>Tags Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tags in paginatedTags" :key="tags._id">
          <td>{{ tags.tagsname }}</td>
          <td>{{ tags.description }}</td>
          <td>
            <button @click="editTag(tags)" class="edit-tag-button">Edit</button>
            <button @click="deleteTag(tags._id)" class="delete-tag-button">
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
    <AddTagForm
      ref="addTagsForm"
      :organizationId="currentUser.profile.organizationId"
    />
  </div>
</template>

<script>
import { TagsCollection } from "../../db/TagsCollection";
import AddTagForm from "./forms/AddTagsForm.vue";

export default {
  name: "TagsTab",
  components: {
    AddTagForm,
    props: ["organizationId"],
  },
  data() {
    return {
      currentPage: 1,
      tagsPerPage: 10,
    };
  },
  meteor: {
    $subscribe: {
      tags: [],
    },
    currentUser() {
      return Meteor.user();
    },
    tags() {
      return TagsCollection.find(
        { organizationId: this.currentUser.profile.organizationId },
        { sort: { createdAt: -1 } }
      );
    },
  },
  computed: {
    paginatedTags() {
      const startIndex = (this.currentPage - 1) * this.tagsPerPage;
      const endIndex = startIndex + this.tagsPerPage;
      return this.tags.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.tags.length / this.tagsPerPage);
    },
  },
  methods: {
    addTag() {
      this.$refs.addTagsForm.resetForm();
      this.$refs.addTagsForm.show();
    },
    editTag(tags) {
      this.$refs.addTagsForm.selectedTag = tags;
      this.$refs.addTagsForm.populateFormFields();
      this.$refs.addTagsForm.show(tags);
    },
    deleteTag(tagsId) {
      Meteor.call("tags.remove", tagsId);
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
.tags-tab {
  text-align: left;
  margin-left:16rem;
}

.tag-count {
  margin-bottom: 10px;
}

.add-tags-button {
  margin-bottom: 10px;
}

.addTag {
  padding: 10px 20px;
  background-color: #7745d6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.addTag:hover {
  background-color: #622cc9;
}
.tag-table {
  width: 98%;
  margin-top: auto;
  margin-bottom: auto;
  border-collapse: collapse;
}

.tag-table th,
.tag-table td {
  padding: 8px;
  border: 1px solid #ccc;
}

.tag-table th {
  background-color: #f0f0f0;
}

.tag-table td {
  text-align: left;
}

.edit-tag-button {
  padding: 5px 10px;
  background-color: #7745d6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.delete-tag-button {
  padding: 5px 10px;
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>