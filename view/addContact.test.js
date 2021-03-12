/**
 * @jest-environment jsdom
 */

import fs from 'fs'
import path from 'path'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, getByText, getByLabelText} from '@testing-library/dom'
import { JSDOM } from 'jsdom'
import AddContactView from './addContact.js'

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), { encoding: "utf-8" })

let options = {
  runScripts: 'dangerously',
}

let dom
let container
const addContactView = new AddContactView
dom = new JSDOM(html, options)
container = dom.window.document.body.innerHTML = addContactView.$main


describe('Unit tests from Add Contact', () => {

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: { assign: jest.fn() },
    });
  })

  test('Should render a form in the view', () => {
    expect(container).toMatchSnapshot()
  })

  describe('When a submit form', () => {

    test('Should a fill a form', () => {
      let name = getByLabelText(container, /Nome completo/)
      let email = getByLabelText(container, /E-mail/)
      let cpf = getByLabelText(container, /CPF/i)
      let phone = getByLabelText(container, /Telefone/i)

      name.value = 'Joe Doe'
      email.value = "joedoe@joedoemail.cc"
      cpf.value = '299.300.888-55'
      phone.value = '(11) 92354-6787'

      expect(name.value).not.toEqual("")
      expect(name.value.length).toBeGreaterThan(3)

      expect(email.value).not.toEqual("")
      expect(email.value).toMatch(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/)

      expect(cpf.value).not.toEqual("")
      expect(cpf.value.length).toBeLessThanOrEqual(14)

      expect(phone.value).not.toEqual("")
      expect(phone.value.length).toBeGreaterThanOrEqual(10)

    })

    test('Should make a button able to click', async () => {
      let name = getByLabelText(container, /Nome completo/)
      let email = getByLabelText(container, /E-mail/)
      let cpf = getByLabelText(container, /CPF/i)
      let phone = getByLabelText(container, /Telefone/i)
      const button = getByText(container, /Cadastrar/i)

      name.value = 'Joe Doe'
      email.value = "joedoe@joedoemail.cc"
      cpf.value = '299.300.888-55'
      phone.value = '(11) 92354-6787'

      expect(name.value).not.toEqual("")
      expect(name.value.length).toBeGreaterThan(3)

      expect(email.value).not.toEqual("")
      expect(email.value).toMatch(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/)

      expect(cpf.value).not.toEqual("")
      expect(cpf.value.length).toBeLessThanOrEqual(14)

      expect(phone.value).not.toEqual("")
      expect(phone.value.length).toBeGreaterThanOrEqual(10)

      await button.toggleAttribute("disabled")
      expect(button).toBeEnabled()
    })

    test('Should a submit event', async () => {
      const handleSubmitMock = jest.fn();
      let name = getByLabelText(container, /Nome completo/)
      let email = getByLabelText(container, /E-mail/)
      let cpf = getByLabelText(container, /CPF/i)
      let phone = getByLabelText(container, /Telefone/i)
      const button = getByText(container, /Cadastrar/i)
      button.addEventListener('click', handleSubmitMock, false)

      name.value = 'Joe Doe'
      email.value = "joedoe@joedoemail.cc"
      cpf.value = '299.300.888-55'
      phone.value = '(11) 92354-6787'

      expect(name.value).not.toEqual("")
      expect(name.value.length).toBeGreaterThan(3)

      expect(email.value).not.toEqual("")
      expect(email.value).toMatch(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/)

      expect(cpf.value).not.toEqual("")
      expect(cpf.value.length).toBeLessThanOrEqual(14)

      expect(phone.value).not.toEqual("")
      expect(phone.value.length).toBeGreaterThanOrEqual(10)

      button.removeAttribute("disabled")
      await expect(button).toBeEnabled()

      await fireEvent.click(button)
      expect(handleSubmitMock).toHaveBeenCalled()
    })
   })
 })
