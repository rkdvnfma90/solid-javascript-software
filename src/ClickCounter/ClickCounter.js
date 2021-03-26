var App = App || {}

// data의 value를 공유하기 위해 객체형태로 만듬
App.ClickCounter = (_data) => {
  if (!_data) throw new Error('초기값을 주입받지 않았습니다.')

  const data = _data

  data.value = data.value || 0

  return {
    getValue() {
      return data.value
    },
    count() {
      return (data.value += 1)
    },
    setCountFn(fn) {
      this.count = () => (data.value = fn(data.value))
      return this // 함수 체이닝을 위해 this 리턴
    },
  }
}

export { App }
