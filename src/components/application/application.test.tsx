import { render, screen } from '@testing-library/react'
import { Application } from './application'

describe('Application', () => {
  test('renders correctly', () => {
    render(<Application />)

    const pageHeading = screen.getByRole('heading', {
      level: 1,
    })
    expect(pageHeading).toBeInTheDocument()

    const sectionHeading = screen.getByRole('heading', {
      level: 2,
    })
    expect(sectionHeading).toBeInTheDocument()

    const paragraphElement = screen.getByText('All fields are mandatory')
    expect(paragraphElement).toBeInTheDocument()

    const closeElement = screen.getByTitle('close')
    expect(closeElement).toBeInTheDocument()

    const imageElement = screen.getByAltText('a person with a laptop')
    expect(imageElement).toBeInTheDocument()

    const customElement = screen.getByTestId('custom-element')
    expect(customElement).toBeInTheDocument()

    const nameElement = screen.getByRole('textbox', {
      name: 'Name',
    })
    expect(nameElement).toBeInTheDocument()

    const nameElement2 = screen.getByLabelText('Name', {
      // 抓到 getByLabelText 是文本為 Name 的 lable tag , 然後抓到這個 label 的 htmlFor="name" 對應到 <input type="text" id="name" /> 元素
      selector: 'input',
    })
    expect(nameElement2).toBeInTheDocument()

    const nameElement3 = screen.getByPlaceholderText('Fullname')
    expect(nameElement3).toBeInTheDocument()

    const nameElement4 = screen.getByDisplayValue('Vishwas')
    expect(nameElement4).toBeInTheDocument()

    const bioElement = screen.getByRole('textbox', {
      name: 'Bio',
    })
    expect(bioElement).toBeInTheDocument()

    const jobLocationElement = screen.getByRole('combobox')
    expect(jobLocationElement).toBeInTheDocument()

    const termsElement = screen.getByRole('checkbox')
    expect(termsElement).toBeInTheDocument()

    // label tag wrap 其他 tag 的時候也可以用 getByLabelText 抓到元素
    const termsElement2 = screen.getByLabelText(
      'I agree to the terms and conditions',
    )
    expect(termsElement2).toBeInTheDocument()

    const submitButtonElement = screen.getByRole('button')
    expect(submitButtonElement).toBeInTheDocument()

    expect(submitButtonElement).toBeDisabled()
  })
})
