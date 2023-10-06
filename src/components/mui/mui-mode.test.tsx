import { render, screen } from '@testing-library/react'
import AppProviders from '../../providers/app-providers'
import { MuiMode } from './mui-mode'

describe('MuiMide', () => {
  test('renders text correctly', () => {
    render(<MuiMode />, {
      // 設定 AppProviders 包裹著 MuiMode 組件
      // 在 src/App.tsx 中 AppProviders 包裹了其他子組件, 包含 MuiMode 組件
      // 為了達到一樣的效果我們設定 wrapper: AppProviders
      wrapper: AppProviders,
    })
    const headingElement = screen.getByRole('heading')
    expect(headingElement).toHaveTextContent('dark mode')
  })
})
