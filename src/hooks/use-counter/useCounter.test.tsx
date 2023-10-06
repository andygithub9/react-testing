import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { useCounter } from './useCounter'

describe('useCount', () => {
  test('should render initial count', () => {
    const { result } = renderHook(useCounter)
    expect(result.current.count).toBe(0)
  })

  test('should accept and render the same initial count', () => {
    const { result } = renderHook(useCounter, {
      initialProps: {
        initialCount: 10,
      },
    })
    expect(result.current.count).toBe(10)
  })

  // https://zh-hant.reactjs.org/docs/testing-recipes.html
  // https://zh-hant.reactjs.org/docs/testing-recipes.html#act
  // 一般狀況下 rtl 會把所有的東西都用 act function wrap 起來並監測狀態，但是像我們現在要測試的 custom hooks ，我們直接調用 increment function 的話 rtl 並沒有監測到 count 的狀態，所以我們必須手動引入 act function 並把 increment function 用 act function wrap 起來，讓 rtl 知道我們用 increment function 更新了 count 的狀態
  // 在測試 custom hooks 或是會更新狀態的代碼的時候，rtl 沒辦法把他們 wrap 在 act function 裡面，必須手動引入 act function 並把造成狀態更新的代碼 wrap 起來
  test('should increment the count', () => {
    const { result } = renderHook(useCounter)
    act(() => result.current.increment())
    expect(result.current.count).toBe(1)
  })

  test('should decrement the count', () => {
    const { result } = renderHook(useCounter)
    act(() => result.current.decrement())
    expect(result.current.count).toBe(-1)
  })
})
