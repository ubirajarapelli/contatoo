export default class AddContactController {
  constructor(contactsModel, addContactView) {
    this.contactsModel = contactsModel
    this.addContactView = addContactView

    this.addContactView.addContact(this.handleAddContact)
  }

  init() {
    this.addContactView.render()
  }

  handleAddContact = contact => {
    this.contactsModel.addContact(contact)
  }

}