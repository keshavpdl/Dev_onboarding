import { ContactsCollection } from "../../db/ContactsCollection.js";

Meteor.methods({
  "contacts.insert"(contactDetails) {
    ContactsCollection.insert({
      ...contactDetails,
      createdAt: new Date(),
    });
  },
  "contacts.remove"(contactId) {
    ContactsCollection.remove(contactId);
  },
  "contacts.update"(contactId, newContactDetails) {
    ContactsCollection.update(contactId, {
      $set: {
        ...newContactDetails,
        updatedAt: new Date(),
       },
    });
  },
});
