import { faker } from '@faker-js/faker'
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
      date: faker.date.birthdate(),
      relatedPerson: createRandomPerson(),
      notes: faker.datatype.boolean() ? faker.lorem.paragraph() : null,
      active: faker.datatype.boolean()
    }
  })
  store.set('dates', dates)
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
  store.set('dates', dates)
}

function addData(newData) {
  const dates = getData()
  dates.push(newData)
  store.set('dates', dates)
}

function resetData() {
  store.remove('dates')
  console.log('Data reset')
}

export { getData, saveData, addData, resetData }
