import { config } from '@vue/test-utils'
import { BaseWrapper } from '@vue/test-utils'

function findByTestId(id) {
  return this.find(`[data-testid="${id}"]`)
}

function findByText(selector, text) {
  console.log({ selector })
  const result = this[typeof selector === 'string' ? 'findAll' : 'findAllComponents'](selector)
    .filter((f) => f.text() === text)
    .at(0)
  return result
}

const crossbeamSelectorUtilitiesPlugin = () => {
  BaseWrapper.prototype.findByTestId = findByTestId
  BaseWrapper.prototype.findByText = findByText
}

config.plugins.VueWrapper.install(crossbeamSelectorUtilitiesPlugin)
