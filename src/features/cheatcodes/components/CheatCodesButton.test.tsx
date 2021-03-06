import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'

import { navigate } from '__mocks__/@react-navigation/native'

import { CheatCodesButton } from './CheatCodesButton'

describe('CheatCodesButton component', () => {
  it('should have a button to go to the Login', () => {
    const component = render(<CheatCodesButton />)

    const Button = component.getByText('CheatCodes')
    fireEvent.press(Button)

    expect(navigate).toHaveBeenCalledWith('CheatCodes')
  })
})
