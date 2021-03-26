var App = App || {}

App.ClickCounter = (_data) => {
  if (!_data) throw new Error('초기값을 주입받지 않았습니다.')

  const data = _data

  data.value = data.value || 0

  return {
    getValue() {
      return data.value
    },
    increase() {
      return (data.value += 1)
    },
  }
}

export { App }
