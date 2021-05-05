import { render } from '@testing-library/react'

import StatusMenu from './status-menu'

describe('MenuBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StatusMenu />)
    expect(baseElement).toBeTruthy()
  })
})
