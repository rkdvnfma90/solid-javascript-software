var App = App || {}

App.ClickCounter = () => {
  let value = 0
  return {
    getValue() {
      return value
    },
    increase() {
      return (value += 1)
    },
  }
}

export { App }
