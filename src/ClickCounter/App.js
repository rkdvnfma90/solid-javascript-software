import { App } from './ClickCounterView.js'

const clickCounter = App.ClickCounter()
const $update = document.querySelector('#counter-display')
const $trigger = document.querySelector('#btn-increase')
const view = App.ClickCounterView(clickCounter, { $update, $trigger })
view.updateView()

console.log($update, $trigger, view)
