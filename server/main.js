import { Meteor } from "meteor/meteor";
import "/imports/api/methods/organizationsMethods";
import "/imports/api/publications/organizationsPublications";
import "/imports/api/methods/accountsMethods";
import "/imports/api/publications/usersPublications";
import "/imports/api/publications/contactsPublications";
import "/imports/api/methods/contactsMethods";
import { OrganizationsCollection } from "/imports/db/OrganizationsCollection";
import { Accounts } from "meteor/accounts-base";

const SEED_USERNAME = "keela";
const SEED_PASSWORD = "abcd";

Meteor.startup(() => {
  //code when the server starts
  OrganizationsCollection.createIndex({ name: 1 }, { unique: true }); // making name of organization unique
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
      profile: {
        role: "keelaAdmin",
        address: "ktm",
        phone: "1234567890",
      },
    });
  }
  //console.log(Meteor.users.find().fetch());
});
