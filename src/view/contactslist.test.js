/**
 * @jest-environment jsdom
 */

import fs from 'fs'
import path from 'path'
import fetch from 'jest-fetch-mock'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, getByText, getByTestId, getByRole, waitForElementToBeRemoved } from '@testing-library/dom'
import { JSDOM } from 'jsdom'
import ContactsListView from './contactsList.js'

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const mock = [
  {
    "name": "My name 1",
    "cpf": "04080757247",
    "phone": "11987654321",
    "email": "myemail1@test.com.br"
  },
  {
    "name": "My name 2",
    "cpf": "77797584192",
    "phone": "11987654321",
    "email": "myemail2@test.com.br"
  },
  {
    "name": "My name 3",
    "cpf": "45486737688",
    "phone": "11987654321",
    "email": "myemail3@test.com.br"
  },
  {
    "name": "My name 4",
    "cpf": "74668869066",
    "phone": "11987654321",
    "email": "myemail4@test.com.br"
  }
]

let options = {
  runScripts: 'dangerously',
}

let dom
let container
dom = new JSDOM(html, options)

const contactsListView = new ContactsListView
container = dom.window.document.body.innerHTML = contactsListView.$mainTemplate

describe('Unit tests from a Contact List',  () => {

  describe('When a load the contact`s list page', () => {
    test('Should render a empty list', ()  => {
      contactsListView.render()
      expect(container).toMatchSnapshot()
    })

    test('Should render with a inital data', ()  => {
      contactsListView.render(mock)
      expect(container).toMatchSnapshot()
    })
  })

  describe('When a contact`s list have contacts', () => {
    beforeEach(() => {
      contactsListView.render(mock)
    })

    test('Should click a exclude button and remove a contact', async () => {
      const handleSubmitMock = jest.fn();
      const excludeButton = getByTestId(container, 2)

      excludeButton.addEventListener('click', handleSubmitMock, false)

      await fireEvent.click(excludeButton)
      expect(handleSubmitMock).toHaveBeenCalled()
    })

    test('Should a list with 3 contact cards, when click a exclude button', async () => {
      const handleSubmitMock = jest.fn();
      const excludeButton = getByTestId(container, 2)

      excludeButton.addEventListener('click', handleSubmitMock, false)

      await fireEvent.click(excludeButton)
      expect(handleSubmitMock).toHaveBeenCalled()

      waitForElementToBeRemoved(() => excludeButton.parentNode)
      expect(container).toMatchSnapshot()
    })
  })

})

