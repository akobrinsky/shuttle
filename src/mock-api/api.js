import { faker } from '@faker-js/faker'
import { uniqBy } from 'lodash'
import store from 'store2'

const SEED_DATES = [
  'Wedding Anniversary',
  "Niece's Birthday",
  "Sister's Birthday",
  'Work Anniversary',
  "Parent's Anniversary"
]

function createRandomPerson() {
  return {
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName()
  }
}

function getData() {
  const fromStorage = store.get('dates')
  if (fromStorage) {
    return fromStorage
  }
  const dates = SEED_DATES.map((name) => {
    return {
      id: faker.database.mongodbObjectId(),
      name,
      date: faker.date.birthdate().toISOString(),
      relatedPerson: createRandomPerson(),
      notes: faker.datatype.boolean() ? faker.lorem.paragraph() : null,
      active: faker.datatype.boolean()
    }
  })

  // quick and simple way to persist related people from the seed data
  const uniquePeople = uniqBy(
    dates.map((date) => date.relatedPerson),
    'email'
  )
  store.set('people', uniquePeople)
  saveDates(dates)

  return dates
}

function saveData(indexOrId, newData) {
  const dates = getData()
  if (typeof indexOrId === 'number') {
    dates[indexOrId] = newData
  } else {
    const index = dates.findIndex((date) => date.id === indexOrId)
    if (index === -1) {
      throw new Error(`Could not find date with id ${indexOrId}`)
    }
    dates[index] = newData
  }
  saveDates(dates)
}

function getPeople() {
  const peopleFromStorage = store.get('people')
  return peopleFromStorage || []
}

function addData(newData) {
  const dates = getData()
  dates.push(newData)
  saveDates(dates)
}

function resetData() {
  store.remove('dates')
  store.remove('people')
  console.log('Data reset')
}

function saveDates(dateData) {
  store.set('dates', dateData)
}

export { getData, saveData, addData, resetData, saveDates, getPeople }
