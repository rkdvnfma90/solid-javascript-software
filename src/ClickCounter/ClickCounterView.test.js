import { App } from './ClickCounterView.js'

// 보이는 부분 (화면)
/**
 * 데이터를 조회할 ClickCounter를 어떻게 얻을까?
 * 게다가 데이터를 출력할 돔 엘리먼트는 어떻게 테스트 할까?
 * 정답은 주입하는 것이다!
 *
 * ClickCounter 객체를 만들어 파라미터로 전달(주입) 받자.
 * 데이터를 출력할 돔 엘리먼트 또한 만들어서 전달 받자.
 *
 * TDD 방식으로 사고하다 보면 필요한 모듈을 주입받아서 사용하는 경향이 생긴다.
 * 하나의 기능단위로 모듈을 분리할 수 있기 때문에 단일 책임의 원칙을 지킬 수 있다.
 */
describe('클릭카운터 뷰', () => {
  let ClickCounter, $update, $trigger, view
  beforeEach(() => {
    const data = { value: 0 }
    ClickCounter = App.ClickCounter(data)
    $update = document.createElement('span')
    $trigger = document.createElement('button') // 클릭 이벤트를 바인당할 엘리먼트
    view = App.ClickCounterView(ClickCounter, { $update, $trigger })
  })

  it('ClickCounter를 주입하지 않으면 에러를 던진다.', () => {
    const clickCounter = null
    const $update = document.createElement('span')
    const actual = () => App.ClickCounterView(clickCounter, { $update })
    expect(actual).toThrowError()
  })

  it('$update를 주입하지 않으면 에러를 던진다.', () => {
    const $update = null
    const actual = () => App.ClickCounterView(ClickCounter, { $update })
    expect(actual).toThrowError()
  })

  describe('updateView()', () => {
    it('클릭카운터의 getValue() 값을 출력한다.', () => {
      const counterValue = ClickCounter.getValue()
      view.updateView()
      expect($update.innerHTML).toBe(counterValue.toString())
    })
  })

  // 이렇게 두 가지 기능이 있다면, 하나씩 분리하여 테스트 하자!
  describe('increaseAndUpdateView() 는 ', () => {
    it('클릭카운터의 count를 실행하고', () => {
      // 클릭카운터 모듈의 count 함수를 감시한다.
      spyOn(ClickCounter, 'count')
      view.increaseAndUpdateView()
      expect(ClickCounter.count).toHaveBeenCalled()
    })

    it('updateView를 실행한다.', () => {
      // 클릭카운터 뷰 모듈의 updateView 함수를 감시한다.
      spyOn(view, 'updateView')
      view.increaseAndUpdateView()
      expect(view.updateView).toHaveBeenCalled()
    })
  })

  it('클릭 이벤트가 발생하면 increaseAndUpdateView가 실행한다.', () => {
    // 클릭카운터 뷰 모듈의 increaseAndUpdateView 함수를 감시한다.
    spyOn(view, 'increaseAndUpdateView')

    // 여기서는 클릭 이벤트를 감지해야 하는데, 카운터 값을 출력할 돔 엘리먼트를 주입했던 것처럼
    // 클릭 이벤트 핸들러를 바인딩할 돔을 주입하자.
    $trigger.click()

    expect(view.increaseAndUpdateView).toHaveBeenCalled()
  })
})
