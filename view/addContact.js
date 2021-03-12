import ContactsModel from '../model/contacts.model.js'
import AddContactController from '../controller/addContact.controller.js'

export default class AddContactView {
  constructor() {

    const inputForm = {
      name: {
        name: 'name',
        type: 'text',
        placeholder: 'Nome completo (sem abreviações)',
        minlength: 3,
        maxlength: 50,
        pattern: '.+',
        required: true,
      },
      email: {
        name: 'email',
        type: 'email',
        placeholder: 'E-mail',
        pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}',
        required: true
      },
      cpf: {
        name: 'cpf',
        type: 'text',
        placeholder: 'CPF',
        minlength: '14',
        pattern: '.+',
        required: true
      },
      phone: {
        name: 'phone',
        type: 'text',
        minlength: '10',
        placeholder: 'Telefone',
        pattern: '.+',
        required: true
      }
    }

    this.$main = document.querySelector('main')
    let mainExist = true;
    if (this.$main === null) {
      this.$main = document.createElement('main');
      mainExist = false;
    }

    let $mainTemplate = document.createElement('section');
    $mainTemplate.id = "contact-add"

    this.$form = document.createElement('form');
    this.inputName = this.createElement(inputForm['name'])
    this.inputEmail = this.createElement(inputForm['email'])
    this.inputCPF = this.createElement(inputForm['cpf'])
    this.inputPhone = this.createElement(inputForm['phone'])
    this.inputButton = document.createElement('button')
    this.inputButton.setAttribute('type', 'submit')
    this.inputButton.setAttribute('disabled', true)
    this.inputButton.textContent = "Cadastrar"

    this.$form.append(this.inputName, this.inputEmail, this.inputCPF, this.inputPhone, this.inputButton)
    $mainTemplate.append(this.$form)
    this.$main.appendChild($mainTemplate)
  }

  render() {}

  createElement(params) {
    const { name, type, placeholder, minlength, pattern, required } = params

    let div = document.createElement('div')
    let label = document.createElement('label')
    let input = document.createElement('input')
    let error = document.createElement('span')

    label.setAttribute('for', name)
    label.textContent = placeholder
    input.value = ""
    input.type = type
    input.type = name
    input.id = name
    input.placeholder = placeholder
    input.required = required
    input.minLength = minlength
    input.pattern = pattern
    input.addEventListener('input', this.validField)
    input.addEventListener('blur', this.validButton.bind(this))
    input.addEventListener('blur', this.hasValue)
    input.addEventListener('keyup', this.setMask)

    error.id = `${name}-error`
    error.setAttribute('aria-live', 'polite')

    div.append(label, input, error)
    return div
  }

  clearForm(form) {
    for (let $input of form) {
      $input.value = ''
      $input.previousElementSibling.classList.remove('has-value')
    }
    this.inputButton.disabled = true
  }

  addContact(handler) {
    this.$form.addEventListener('submit', event => {
      event.preventDefault()
      let newContact = {};

      [...this.$form].forEach(input => {
        newContact[input.id] = input.value;
      })
      console.log(this);

      handler(newContact)
      this.clearForm(this.$form)
    })
  }

  hasValue() {
    if(this.value) {
      this.previousElementSibling.classList.add('has-value')
    }
  }

  setMask() {
    const phoneMask = (value) => {
      let internalValue = value.replace(/\D/g, '')
      if (internalValue.length >= 11) {
        return internalValue.replace(/^(\d\d)(\d{5})(\d{4}).*/,"($1) $2-$3");
      }
      return internalValue.replace(/^(\d\d)(\d{4})(\d{4}).*/,"($1) $2-$3");
    }

    const cpfMask = (value) => {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
    }

    if(this.id === "cpf") {
      this.value = cpfMask(this.value)
    }
    if(this.id === "phone") {
      this.value = phoneMask(this.value)
    }
  }

  validButton() {
    let internalValidity = []
    let isDisabled = false;
    this.inputButton.setAttribute('disabled', true);

    [...this.$form].forEach(input => {
      internalValidity.push(!input.validity.valid)
      isDisabled = internalValidity.every(valid => valid === false)
    })

    if (isDisabled) {
      this.inputButton.toggleAttribute("disabled")
    }
  }

  validField() {
    if (this.validity.valid) {
      this.nextElementSibling.textContent = "";
      this.nextElementSibling.classList.remove('active');
    }

    if (!this.validity.valid) {
      console.log(this.nextElementSibling);
      this.nextElementSibling.className = "error active";

      if (this.id === 'name') {
        this.nextElementSibling.textContent = "O Campo deve ter 3 caracteres ou mais";
      }
      if (this.id === 'email') {
        this.nextElementSibling.textContent = "Digite um email válido";
      }
      if (this.id === 'cpf') {
        this.nextElementSibling.textContent = "Digite apenas números";
      }
      if (this.id === 'phone') {
        this.nextElementSibling.textContent = "Digite apenas números";
      }
    }
  }
}

const addContactApp = new AddContactController(new ContactsModel(), new AddContactView())
addContactApp.init()
