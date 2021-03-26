import { App } from './ClickCounter.js'

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
  let counter, $update, view
  beforeEach(() => {
    counter = App.ClickCounter()
    $update = document.createElement('span')
    view = App.ClickCounterView(counter, $update)
  })

  describe('updateView()', () => {
    it('클릭카운터의 getValue() 값을 출력한다.', () => {
      const counterValue = counter.getValue()
      view.updateView()
      expect($update.innerHTML).expect(counterValue.toString())
    })
  })
})
