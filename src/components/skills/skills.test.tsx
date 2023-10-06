import { render, screen } from '@testing-library/react'
import { Skills } from './skills'

describe('Skills', () => {
  const skills = ['HTML', 'CSS', 'JavaScript']

  test('renders correctly', () => {
    render(<Skills skills={skills} />)
    const listElement = screen.getByRole('list')
    expect(listElement).toBeInTheDocument()
  })

  test('render a list of skills', () => {
    render(<Skills skills={skills} />)
    const listItemElements = screen.getAllByRole('listitem')
    expect(listItemElements).toHaveLength(skills.length)
  })

  test('render Login button', () => {
    render(<Skills skills={skills} />)
    const loginButton = screen.getByRole('button', {
      name: 'Login',
    })
    expect(loginButton).toBeInTheDocument()
  })

  test('Start learning button is not rendered', () => {
    render(<Skills skills={skills} />)
    // 用 getByRole, 會出現錯誤: TestingLibraryElementError: Unable to find an accessible element with the role "button" and name "Start learning"
    // 因為 TestingLibrary 找不到 name 是 "Start learning" 的 button
    // 但是我們預期的就是他不應該出現在 Document 裡面, 所以要用 queryBy 去壁面這個錯誤

    // const startLearningButton=screen.getByRole("button",{
    //   name:"Start learning"
    // })

    // 用 queryByRole 這個方法去抓元素時即使元素不存在也不會報錯而是返回 null
    const startLearningButton = screen.queryByRole('button', {
      name: 'Start learning',
    })
    // console.log(startLearningButton); // null

    expect(startLearningButton).not.toBeInTheDocument()
  })

  test('Start learning button is eventually displayed', async () => {
    // const view = render(<Skills skills={skills} />); // 把 render(組件) 的返回值賦值給 view 變數
    // logRoles(view.container) // 會在終端機印出 dom 裡面的所有 role
    // screen.debug() // screen.debug() 可以在終端機顯示目前的 dom tree

    // findby query 用於在 timeout 後找到該元素
    // Skills 組件在 1001ms 之後會顯示 Start learning button
    // 所以我們用 async/await 加上 findby query 在兩秒之後抓 Start learning button

    render(<Skills skills={skills} />)
    const startLearningButton = await screen.findByRole(
      'button',
      {
        name: 'Start learning',
      },
      {
        timeout: 2000,
      },
    )
    // screen.debug() // screen.debug() 可以在終端機顯示目前的 dom tree
    expect(startLearningButton).toBeInTheDocument()
  })
})
