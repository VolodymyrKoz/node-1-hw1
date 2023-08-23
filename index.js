const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = yargs(hideBin(process.argv)).argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then(console.table).catch(console.error);
      break;

    case "get":
      getContactById(id)
        .then((contact) =>
          contact ? console.table([contact]) : console.log("Contact not found")
        )
        .catch(console.error);
      break;

    case "add":
      addContact(name, email, phone).then(console.table).catch(console.error);
      break;

    case "remove":
      removeContact(id)
        .then((contact) =>
          contact ? console.table([contact]) : console.log("Contact not found")
        )
        .catch(console.error);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
