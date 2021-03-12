import ContactsListView from '../view/contactsList.js'
import AddContactView from '../view/addContact.js'

const renderContent = (hash) => {
  const sectionList = document.getElementById('contact-list')
  const sectionAdd = document.getElementById('contact-add')

  const loadHome = () => {
    sectionList.classList.remove('active')
    sectionAdd.classList.remove('active')
  }

  const loadList = () => {
    sectionAdd.classList.remove('active')
    sectionList.classList.add('active')
  }

  const loadForm = () => {
    sectionList.classList.remove('active')
    sectionAdd.classList.add('active')
  }

  const routes = {
    "": loadHome,
    "#/list": loadList,
    "#/add-contact": loadForm
  }
  return routes[hash]();
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
  renderContent(window.location.hash);
});

window.addEventListener("popstate", () => {
  renderContent(window.location.hash)
});