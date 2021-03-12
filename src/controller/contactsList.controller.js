export default class ContactsListController {
  constructor(contactsModel, listContactsView) {
    this.contactsModel = contactsModel
    this.listContactsView = listContactsView

    this.contactsModel.listContactsChanged(this.handleListContactsChanged)
    this.listContactsView.deleteContact(this.handleDeleteContact)
    this.handleListContactsChanged(this.contactsModel.contacts)
  }
  init() {

    const hasStorage = JSON.parse(window.localStorage.getItem(this.contactsModel.storageName))

    if (hasStorage) {
      console.log('Cai no storage');
      return this.listContactsView.render(this.contactsModel.contacts)
    }

    const URL ="https://private-21e8de-rafaellucio.apiary-mock.com/users"
    fetch(URL)
    .then(resp => resp.json())
    .then(data => {

      this.contactsModel.createListContacts(data)
    })
    .catch(function(error) {
      // console.log("Não foi possivel carregar os dados, tente novamente em instantes");
    })
    .finally(() => {
    });
  }

  handleListContactsChanged = contacts => {
    this.listContactsView.render(contacts)
  }

  handleDeleteContact = id => {
    this.contactsModel.deleteContact(id)
  }

}