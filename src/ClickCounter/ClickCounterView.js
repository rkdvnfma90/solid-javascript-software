import { App as ClickCounterApp } from './ClickCounter.js'

var App = ClickCounterApp || {}

App.ClickCounterView = (clickCounter, { $update, $trigger }) => {
  if (!clickCounter) throw new Error('클릭카운터를 주입받지 않았습니다.')
  if (!$update) throw new Error('update 엘리먼트를 주입받지 않았습니다.')
  if (!$trigger) throw new Error('trigger 엘리먼트를 주입받지 않았습니다.')

  const view = {
    updateView() {
      $update.innerHTML = clickCounter.getValue()
    },
    increaseAndUpdateView() {
      clickCounter.count()
      this.updateView()
    },
  }

  $trigger.addEventListener('click', () => {
    view.increaseAndUpdateView()
  })

  return view
}

export { App }
