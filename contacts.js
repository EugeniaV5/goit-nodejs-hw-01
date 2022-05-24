const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// console.log(contactsPath);
async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  return allContacts;
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  const result = allContacts.find((item) => item.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  const idx = allContacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = allContacts.splice(idx, 1);
  await updateContacts(allContacts);
  //   console.log(removeContact);
  return removeContact;
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  const newContact = { name, email, phone, id: nanoid(4) };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
