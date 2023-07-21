import { TagsCollection } from "../../db/TagsCollection.js";

Meteor.methods({
  "tags.insert"(tagDetails) {
    TagsCollection.insert({
      ...tagDetails,
      createdAt: new Date(),
    });
  },
  "tags.remove"(tagId) {
    TagsCollection.remove(tagId);
  },
  "tags.update"(tagId, newTagDetails) {
    TagsCollection.update(tagId, {
      $set: {
        ...newTagDetails,
        updatedAt: new Date(),
      },
    });
  },
});
