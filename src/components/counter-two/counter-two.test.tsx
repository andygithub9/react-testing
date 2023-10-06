import { render, screen } from '@testing-library/react'
import CounterTwo from './counter-two'
import user from '@testing-library/user-event'

describe('CounterTwo', () => {
  test('renders correctly', () => {
    render(<CounterTwo count={0} />)
    const textElement = screen.getByText('Counter Two')
    expect(textElement).toBeInTheDocument()
  })

  test('handlers are called', async () => {
    user.setup()
    const incrementHanlder = jest.fn()
    const decrementHanlder = jest.fn()
    render(
      <CounterTwo
        count={0}
        handleIncrement={incrementHanlder}
        handleDecrement={decrementHanlder}
      />,
    )
    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    const decrementButton = screen.getByRole('button', { name: 'Decrement' })
    await user.click(incrementButton)
    await user.click(decrementButton)
    expect(incrementHanlder).toHaveBeenCalledTimes(1)
    expect(decrementHanlder).toHaveBeenCalledTimes(1)
  })
})
