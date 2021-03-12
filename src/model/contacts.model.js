export default class ContactsModel {
  constructor() {
    this.storageName = 'usersStore'
    this.contacts = JSON.parse(window.localStorage.getItem(this.storageName))|| []
  }

  listContactsChanged(callback) {
    this.contactsChange = callback
  }

  insert(value) {
    const stringifyValue = JSON.stringify(value)
    window.localStorage.setItem(this.storageName, stringifyValue)
  }

  createListContacts(value) {
    this.insert(value)
  }

  addContact(contact) {
    this.contacts.push(contact)
    this.insert(this.contacts)
  }

  deleteContact(contactId) {
    this.contacts = this.contacts.filter(contact => contact.cpf !== contactId);
    this.insert(this.contacts)
    this.contactsChange(this.contacts)
  }
}