// https://testing-library.com/docs/react-testing-library/setup#custom-render
// Custom Render Function
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
// 把我們之前寫的 AppProviders 引入,
import AppProviders from './providers/app-providers'

// {wrapper: AppProviders, ...options} 設定 wrapper 為 AppProviders
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AppProviders, ...options })

// 導出 '@testing-library/react'
export * from '@testing-library/react'
// 將 customRender function 重命名為 render 後導出
export { customRender as render }
// 之後我們從其他地方引入這支檔案的 render function 去 render 其他組件, 其他組件就會被 AppProviders wrap
