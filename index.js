const { program } = require("commander");

const contactsOperation = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperation.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperation.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id ${id} not found`);
      }
      console.table(contact);

      break;

    case "add":
      const newContact = await contactsOperation.addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const removeContact = await contactsOperation.removeContact(id);
      if (!removeContact) {
        throw new Error(`Contact with id ${deletedId} not found`);
      }
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const options = program.opts();
invokeAction(options);

// invokeAction({ action: "list" });

// const id = "1";
// invokeAction({ action: "get", id });

// const deletedId = "10";
// invokeAction({ action: "remove", id: deletedId });

// const name = "jafhhfhfhne";
// const email = "sgfdfgd@jdfhgj";
// const phone = "32342";

// invokeAction({ action: "add", name, email, phone });
