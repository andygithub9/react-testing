import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import Counter from './counter'

describe('Counter', () => {
  test('renders correctly', () => {
    render(<Counter />)
    const countElement = screen.getByRole('heading')
    expect(countElement).toBeInTheDocument()
    const incrementButton = screen.getByRole('button', {
      name: 'Increment',
    })
    expect(incrementButton).toBeInTheDocument()
  })

  test('renders a count of 0', () => {
    render(<Counter />)
    const countElement = screen.getByRole('heading')
    expect(countElement).toHaveTextContent('0')
  })

  test('renders a count of 1 after clicking the increment button', async () => {
    user.setup()
    render(<Counter />)
    const incrementButton = screen.getByRole('button', {
      name: 'Increment',
    })
    await user.click(incrementButton)
    const countElement = screen.getByRole('heading')
    expect(countElement).toHaveTextContent('1')
  })

  test('Should render 2 on double click', async () => {
    user.setup()
    render(<Counter />)
    const incrementButton = screen.getByRole('button', { name: 'Increment' })

    await user.click(incrementButton)
    await user.click(incrementButton)
    const countElement = screen.getByRole('heading')
    expect(countElement).toHaveTextContent('2')
  })

  // Keyboard Interactions
  test('renders a count of 10 after clicking the set button', async () => {
    user.setup()
    render(<Counter />)
    const amountInput = screen.getByRole('spinbutton') // spinbutton 是 input:number 的 role
    await user.type(amountInput, '10') // user.type(component, 輸入的字串) 模仿使用者輸入
    expect(amountInput).toHaveValue(10)
    const setButton = screen.getByRole('button', { name: 'Set' })
    await user.click(setButton)
    const countElement = screen.getByRole('heading')
    expect(countElement).toHaveTextContent('10')
  })

  // Keyboard Interactions
  test('elements are focused in the right order', async () => {
    user.setup()
    render(<Counter />)
    const amountInput = screen.getByRole('spinbutton') // spinbutton 是 input:number 的 role
    const setButtom = screen.getByRole('button', { name: 'Set' })
    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    await user.tab() // 模仿使用者按下 tab 鍵
    expect(incrementButton).toHaveFocus() // 預期會 focus 在 incrementButton
    await user.tab() // 模仿使用者按下 tab 鍵
    expect(amountInput).toHaveFocus() // 預期會 focus 在 amountInput
    await user.tab() // 模仿使用者按下 tab 鍵
    expect(setButtom).toHaveFocus() // 預期會 focus 在 setButtom
  })
})
