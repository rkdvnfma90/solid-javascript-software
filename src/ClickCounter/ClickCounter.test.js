describe('클릭카운터', () => {
  describe('getValue()', () => {
    it('초기값이 0인 카운터 값을 반환한다.', () => {
      const counter = App.clickCounter()
      expect(counter.getValue()).toBe(0)
    })
  })
})
