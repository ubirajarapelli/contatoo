import ContactsModel from '../model/contacts.model.js'
import ContactsListController from '../controller/contactsList.controller.js'

export default class ContactsListView {
  constructor() {
    this.$main = document.querySelector('main')

    let mainExist = true;
    if (this.$main === null) {
      this.$main = document.createElement('main');
      mainExist = false;
    }

    this.$mainTemplate = document.createElement('section');
    this.$mainTemplate.setAttribute("id", "contact-list")

    let templateExist = true;
    if (this.$mainTemplate === null) {
      this.$mainTemplate = document.createElement('section');
      this.$mainTemplate.setAttribute("id", "contact-list")
      templateExiste = false;
    }

    this.$mainTemplate.append(this.contact)
    this.$main.append(this.$mainTemplate)
  }

  createElement(params, index) {
    const { name, cpf, phone, email } = params

    let fragment = document.createDocumentFragment()
    let article = document.createElement('article')
    let dl = document.createElement('dl')

    let nameTitle = document.createElement('dt')
    nameTitle.textContent = "Nome"

    let nameDescription = document.createElement('dd')
    nameDescription.textContent = name
    nameDescription.setAttribute("contenteditable", "true")

    let emailtitle = document.createElement('dt')
    emailtitle.textContent = "E-mail"

    let emailDescription = document.createElement('dd')
    emailDescription.textContent = email
    emailDescription.setAttribute("contenteditable", "true")

    let cpfTitle = document.createElement('dt')
    cpfTitle.textContent = "CPF"

    let cpfDescription = document.createElement('dd')
    cpfDescription.textContent = cpf
    cpfDescription.setAttribute("contenteditable", "true")

    let phoneTitle = document.createElement('dt')
    phoneTitle.textContent = "Telefone"

    let phoneDescription = document.createElement('dd')
    phoneDescription.textContent = phone
    phoneDescription.setAttribute("contenteditable", "true")

    let div = document.createElement('div')

    let button = document.createElement('button')
    button.id = cpf
    button.classList.add('exclude')
    button.setAttribute("aria-label", "Excluir contato")
    button.setAttribute("data-testid", index)

    let span = document.createElement('span')
    span.innerHTML = "&#10006"

    dl.append(
      nameTitle,
      nameDescription,
      emailtitle,
      emailDescription,
      cpfTitle,
      cpfDescription,
      phoneTitle,
      phoneDescription
    )

    button.appendChild(span)
    div.append(button)

    article.append(dl, div)
    return fragment.appendChild(article)
  }

  render(contacts) {
    let templateExiste = true;
    if (this.$mainTemplate === undefined) {
      this.$mainTemplate = document.createElement('section');
      this.$mainTemplate.id = "contact-list"
      templateExiste = false;
    }

    while (this.$mainTemplate.firstChild) {
      this.$mainTemplate.removeChild(this.$mainTemplate.firstChild)
    }

    if (!contacts || contacts.length === 0) {
      const noContactMessage = document.createElement('div')
      noContactMessage.textContent = "Você ainda não possui contatos ;)"
      return this.$mainTemplate.append(noContactMessage)
    }

    contacts.forEach((contact, index) => {
      return this.$mainTemplate.append(this.createElement(contact, index))
    });
  }

  deleteContact(handler) {
    this.$mainTemplate.addEventListener('click', event => {
      const contactId = event.target.parentElement.id;
      handler(contactId)
    })
  }

}

const contactsListApp = new ContactsListController(new ContactsModel(), new ContactsListView())
contactsListApp.init()