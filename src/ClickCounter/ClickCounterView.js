import { App as ClickCounterApp } from './ClickCounter.js'

var App = ClickCounterApp || {}

App.ClickCounterView = (counter, $update) => {
  return {
    updateView() {
      $update.innerHTML = counter.getValue()
    },
  }
}

export { App }
