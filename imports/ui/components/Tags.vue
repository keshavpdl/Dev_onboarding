<!-- <template>
  <div class="tags-tab">
    <h3>tags List</h3>
    <div class="tags-count">Total tags: {{ tags.length }}</div>
    <div class="add-tags-button">
      <button @click="addtags" class="addtags">Add tags</button>
    </div>
    <table class="tags-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tags) in paginatedtags" :key="tags._id">
          <td>{{ tags.name }}</td>
          <td>{{ tags.description }}</td>
          <td>
            <button @click="edittags(tags)">Edit</button>
            <button @click="deletetags(tags._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="goToPreviousPage" :disabled="currentPage === 1">Previous</button>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
    <AddTagForm ref="addtagsForm" />
  </div>
</template>

<script>
import { tagsCollection } from "../../db/tagsCollection";
import AddTagForm from "./AddTagsForm.vue";

export default {
  name: "tagsTab",
  components: {
    AddTagForm,
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
      return tagsCollection.find({}, { sort: { createdAt: -1 } });
    },
  },
  computed: {
    paginatedtags() {
      const startIndex = (this.currentPage - 1) * this.tagsPerPage;
      const endIndex = startIndex + this.tagsPerPage;
      return this.tags.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.tags.length / this.tagsPerPage);
    },
  },
  methods: {
    addtags() {
      this.$refs.addtagsForm.resetForm();
      this.$refs.addtagsForm.show();
    },
    edittags(tags) {
      this.$refs.addtagsForm.selectedtags = tags;
      this.$refs.addtagsForm.populateFormFields();
      this.$refs.addtagsForm.show(tags);
    },
    deletetags(tagsId) {
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
}

.tags-count {
  margin-bottom: 10px;
}

.add-tags-button {
  margin-bottom: 10px;
}

.addtags {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.tags-table {
  width: 100%;
  border-collapse: collapse;
}

.tags-table th,
.tags-table td {
  padding: 8px;
  border: 1px solid #ccc;
}

.tags-table th {
  background-color: #f0f0f0;
}

.tags-table td {
  text-align: left;
}

.tags-table button {
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