import { App } from './ClickCounter.js'

// 보이지 않는 부분 (비즈니스 로직)
describe('클릭카운터', () => {
  let counter, data

  it('초기값을 주입하지 않으면 에러가 발생한다.', () => {
    const actual = () => (counter = App.ClickCounter())
    expect(actual).toThrowError()
  })

  beforeEach(() => {
    data = { value: 0 }
    counter = App.ClickCounter(data)
  })

  describe('getValue()', () => {
    it('초기값이 0인 카운터 값을 반환한다.', () => {
      expect(counter.getValue()).toBe(0)
    })
  })

  describe('count()', () => {
    it('카운터를 1 올린다.', () => {
      const initialValue = counter.getValue()
      counter.count()
      expect(counter.getValue()).toBe(initialValue + 1)
    })
  })

  describe('setCountFn()', () => {
    it('인자로 함수를 넘기면 count()를 대체한다.', () => {
      const add2 = (value) => value + 2
      const expected = add2(data.value)
      counter.setCountFn(add2).count()
      const actual = counter.getValue()
      expect(actual).toBe(expected)
    })
  })
})
