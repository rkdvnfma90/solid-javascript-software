import { App } from './ClickCounterView.js'

const data = { value: 0 }
const counterDesc = App.ClickCounter(data).setCountFn((v) => v - 1)
const counterInc = App.ClickCounter(data).setCountFn((v) => v + 2)

const $buttonDesc = document.querySelector('#btn-desc')
const $buttonInc = document.querySelector('#btn-inc')
const $update = document.querySelector('#counter-display')

const descCounterView = App.ClickCounterView(counterDesc, {
  $update,
  $trigger: $buttonDesc,
})
const incCounterView = App.ClickCounterView(counterInc, {
  $update,
  $trigger: $buttonInc,
})

descCounterView.updateView()
