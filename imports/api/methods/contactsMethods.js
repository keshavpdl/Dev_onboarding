// import { ContactsCollection } from "../db/ContactsCollection.js";

// Meteor.methods({
//   "contacts.insert"(contactDetails) {
//     ContactsCollection.insert({
//       ...contactDetails,
//       createdAt: new Date(),
//     });
//   },
//   "contacts.remove"(contactId) {
//     ContactsCollection.remove(contactId);
//   },
//   "contacts.update"(contactId, newContactDetails) {
//     ContactsCollection.update(contactId, {
//       $set: {
//         fullname: newContactDetails.fullname,
//         email: newContactDetails.email,
//         address: newContactDetails.address,
//         phone: newContactDetails.phone,
//       },
//     });
//   },
// });

// import { ContactsCollection } from "../db/ContactsCollection.js";

// Meteor.methods({
//   "contacts.insert"(contactDetails) {
//     ContactsCollection.insert({
//       ...contactDetails,
//       createdAt: new Date(),
//     });
//   },
//   "contacts.remove"(contactId) {
//     ContactsCollection.remove(contactId);
//   },
//   "contacts.update"(contactId, newContactDetails) {
//     ContactsCollection.update(contactId, {
//       $set: {
//         fullname: newContactDetails.fullname,
//         email: newContactDetails.email,
//         address: newContactDetails.address,
//         phone: newContactDetails.phone,
//       },
//     });
//   },
// });

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
        fullname: newContactDetails.fullname,
        email: newContactDetails.email,
        address: newContactDetails.address,
        phone: newContactDetails.phone,
      },
    });
  },
});
