import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useDateStore } from '@/stores/date.store'
import TableRow from '@/components/TableRow.vue'
import EventTable from '@/components/EventTable.vue'
import EventModal from '@/components/EventModal.vue'

vi.mock('@/mock-api/api', () => ({
  getData: () => dateList,
  getPeople: () => peopleList,
  saveData: () => vi.fn(),
  saveDates: () => vi.fn()
}))

const dateList = [
  {
    id: '04c4f5bd7dded8cc9530bdbb',
    name: 'Wedding Anniversary',
    date: '1972-05-15T19:56:02.299Z',
    relatedPerson: {
      email: 'Jade.Walsh@yahoo.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/991.jpg',
      firstName: 'Uriah',
      lastName: 'Ullrich'
    },
    notes:
      'Spoliatio coruscus quae cunctatio sono non. Infit ad deripio conventus aegrus villa mollitia arbor. Coruscus vulpes cinis summa venia officiis natus vae.',
    active: false,
    idx: 0
  },
  {
    id: '9e8303bafe05bbc3fadef60d',
    name: "Niece's Birthday",
    date: '1968-09-01T05:32:50.577Z',
    relatedPerson: {
      email: 'Charley_Rogahn@gmail.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/891.jpg',
      firstName: 'Rosamond',
      lastName: 'Paucek'
    },
    notes:
      'Illum pauci volaticus arma ea sequi desolo talio delicate. Ambulo crapula pecco triduana tandem quae tristis tricesimus uredo possimus. Vaco surgo utrimque tenuis temporibus calamitas animadverto.',
    active: false,
    idx: 1
  },
  {
    id: '116bda0efd7fe516373fdfb7',
    name: "Sister's Birthday",
    date: '1997-07-14T23:37:01.514Z',
    relatedPerson: {
      email: 'Cindy42@gmail.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/582.jpg',
      firstName: 'Sabina',
      lastName: 'Ward'
    },
    notes: null,
    active: false,
    idx: 2
  },
  {
    id: '7e47ea9da04493cf4ff967fc',
    name: 'Work Anniversary',
    date: '1956-09-16T05:08:40.639Z',
    relatedPerson: {
      email: 'Raphael85@gmail.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/49.jpg',
      firstName: 'Merl',
      lastName: 'Streich'
    },
    notes: null,
    active: false,
    idx: 3
  },
  {
    id: '3f52cced58e6d0dbff8fde5d',
    name: "Parent's Anniversary",
    date: '1961-06-08T07:37:22.044Z',
    relatedPerson: {
      email: 'Silas.Koch@yahoo.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/762.jpg',
      firstName: 'Jake',
      lastName: 'Parker'
    },
    notes:
      'Pauper carmen vobis. Volubilis valens arx turpis demens apto tabula validus creptio. Socius temptatio facere.',
    active: false,
    idx: 4
  }
]

const peopleList = [
  {
    email: 'Jade.Walsh@yahoo.com',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/991.jpg',
    firstName: 'Uriah',
    lastName: 'Ullrich'
  },
  {
    email: 'Charley_Rogahn@gmail.com',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/891.jpg',
    firstName: 'Rosamond',
    lastName: 'Paucek'
  },
  {
    email: 'Cindy42@gmail.com',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/582.jpg',
    firstName: 'Sabina',
    lastName: 'Ward'
  },
  {
    email: 'Raphael85@gmail.com',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/49.jpg',
    firstName: 'Merl',
    lastName: 'Streich'
  },
  {
    email: 'Silas.Koch@yahoo.com',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/762.jpg',
    firstName: 'Jake',
    lastName: 'Parker'
  }
]
const setup = () => mount(EventTable)

describe('EventTable', () => {
  let dateStore
  beforeEach(() => {
    setActivePinia(createPinia())
    dateStore = useDateStore()
    dateStore.$patch({
      dateList,
      relatedPersonList: peopleList
    })
  })

  it('loads the events', async () => {
    const wrapper = setup()
    const tablerows = wrapper.findAllComponents(TableRow)
    expect(tablerows.length).toBe(5)
  })

  it('can toggle the active state of an event', async () => {
    const wrapper = setup()
    const firstRowCheckbox = wrapper.findComponent(TableRow).find('[data-testid="active-checkbox"]')

    expect(firstRowCheckbox.element.checked).toBe(false)
    expect(dateStore.dateList[2].active).toBe(false)

    await firstRowCheckbox.setValue(true)

    expect(firstRowCheckbox.element.checked).toBe(true)
    expect(dateStore.dateList[2].active).toBe(true)
  })

  it('deletes a row', async () => {
    const wrapper = setup()
    const thirdRow = wrapper.findAllComponents(TableRow).at(2)

    expect(dateStore.dateList.length).toBe(5)

    await thirdRow.find('[data-testid="remove-event-button"]').trigger('click')

    expect(dateStore.dateList.length).toBe(4)
    expect(wrapper.findAllComponents(TableRow).length).toBe(4)
  })

  const getInputElementByName = (wrapper, name, element = 'input') =>
    wrapper.find(`${element}[name="event-${name}"]`)

  it('opens the modal in edit mode', async () => {
    const wrapper = setup()
    const thirdRow = wrapper.findAllComponents(TableRow).at(2)

    await thirdRow.findByTestId('edit-event-button').trigger('click')

    const modal = wrapper.findComponent(EventModal)
    expect(modal.findByText('h1', 'Edit Event')).toBeTruthy()
  })

  it('prefills the modal in edit mode', async () => {
    const wrapper = setup()
    const thirdRow = wrapper.findAllComponents(TableRow).at(2)

    await thirdRow.findByTestId('edit-event-button').trigger('click')

    const modal = wrapper.findComponent(EventModal)

    const nameInput = getInputElementByName(modal, 'name')
    const dateInput = getInputElementByName(modal, 'date')
    const notesInput = getInputElementByName(modal, 'notes', 'textarea')

    expect(nameInput.element.value).toBe("Niece's Birthday")
    expect(dateInput.element.value).toBe('1968-09-01')
    expect(notesInput.element.value).toBe(
      'Illum pauci volaticus arma ea sequi desolo talio delicate. Ambulo crapula pecco triduana tandem quae tristis tricesimus uredo possimus. Vaco surgo utrimque tenuis temporibus calamitas animadverto.'
    )

    const peopleSelectInput = getInputElementByName(modal, 'relationship', 'select')
    const peopleName = peopleList.map((person) => `${person.firstName} ${person.lastName}`)

    // get the options from the select element and take out the "choose releation" option
    const peopleOptions = peopleSelectInput
      .findAll('option')
      .map((option) => option.text())
      .slice(1)
    expect(peopleOptions).toEqual(peopleName)
  })
})
