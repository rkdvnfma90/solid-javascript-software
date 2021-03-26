# 견고한 자바스크립트 소프트웨어 만들기

## 단위 테스트 (unit test)

특정 조건에서 어떻게 작동해야 할지 정의한 것이다.
보통 `함수`로 많이 표현한다.

준비`(arrange)`, 실행`(act)`, 단언`(assert)` 패턴을 따른다.

---

## 테스트 주도 개발 (TDD)

적색(실패), 녹색(성공), 파란색(리팩터링)의 순환이라고 볼 수 있다.

1. 단위테스트를 만든다. (하지만 기능코드를 작성하지 않았기 때문에 실패한다.)
2. 녹색 단계로 가기 위해 기능코드를 작성한다. 잘 작성할 필요 없이 일단 테스트가 통과하도록 작성한다.
3. 리팩토링 한다.

---

## Jest

### Jest란?

자바스크립트의 테스트 라이브러리이다.

테스트 꾸러미

- `describe('테스트 설명', 테스트 구현 함수)`

테스트 스펙

- `it('테스트 설명', 기대식을 가진 테스트 구현 함수)`

기대식과 매쳐

- `expect(결과값).tobe(기대값)`

스파이

- `spyOn(감시할 객체, 감시할 메소드)`

beforeEach -> it 함수 호출 이전에 실행되는 함수이다.

- `beforeEach(함수)`

에러 처리

- `expect(함수).toThrowError()`

---

## 테스트하기 어려운 코드

```html
<button onclick="counter++; countDisplay()">증가</button>
<span id="counter-display">0</span>

<script>
  var counter = 0

  function countDisplay() {
    var el = document.getElementById('counter-display')
    el.innerHTML = counter
  }
</script>
```

위 코드는 3가지정도 문제가 있다.

1. 관심사의 분리 : button의 onclick에서 counter 변수 증가와 countDisplay() 를 동시에 실행함
2. 전역변수의 충돌 : counter 변수
3. 재사용이 어려움 : span id를 하드코딩 함

그렇다면 이러한 코드는 어떻게 테스트를 할 수 있을까?

1. 코드를 UI에서 완전히 분리한다. (HTML에서 JS 코드를 떼어내면 비즈니스 로직만 테스트할 수 있음)
2. 자바스크립트를 별도의 파일로 분리한다. (다른 곳에서 재사용할 수 있고, 테스트성도 좋아진다.)

---

## 모듈 패턴

### 모듈 패턴이란?

함수로 데이터를 감추고 모듈 API를 담고있는 객체를 반환하는 패턴.
크게 본다면 2가지로 나눠볼 수 있다.

1. 임의 함수를 호출하여 생성하는 모듈

```javascript
// app의 네임스페이스를 만든다.
const App = App || {}

App.person = function (God) {
  // name 변수는 모듈안에서만 접근이 가능하다.
  const name = God.makeName()

  // API 노출
  return {
    getName: function () {
      return name
    },
    setName: function (newName) {
      name = newName
    },
  }
}
```

```javascript
// 아래와 같이 사용한다.
const person = App.person(God)
person.getName()
```

2. 즉시 실행 함수 기반의 모듈 (싱글톤 인스턴스가 됨)

```javascript
const App = App || {}

App.person = (function (God) {
  let name = ''

  return {
    getName(God) {
      name = name || God.makeName()
      return name
    },
    setName(newName) {
      name = newName
    },
  }
})() // 함수 선언 즉시 실행한다. (싱글톤)
```

```javascript
// 아래와 같이 사용한다.
App.person.getName(God)
```

### 모듈 생성 원칙

1. 단일 책임 원칙에 따라 모듈은 한 가지 역할만 한다. 그 역할만 집중함으로서 모듈을 더 튼튼하게 한다.
2. 모듈 자신이 사용할 객체가 있다면 `의존성 주입(외부로 부터 필요한 객체를 받음)` 형태로 제공하거나 팩토리 형태로 주입한다. 그래야 테스트 하기 쉽다.
