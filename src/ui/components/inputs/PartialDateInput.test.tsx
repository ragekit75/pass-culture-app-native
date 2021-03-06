import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { ColorsEnum } from 'ui/theme'

import { PartialDateInput, DatePartType } from './PartialDateInput'

describe('PartialDateInput Component', () => {
  it('should call onChangeValue when the value is modified', () => {
    const onChangeValue = jest.fn()
    const { getByPlaceholderText } = render(
      <PartialDateInput
        identifier={DatePartType.DAY}
        onChangeValue={onChangeValue}
        placeholder="PP"
      />
    )
    const input = getByPlaceholderText('PP')

    fireEvent.changeText(input, '10')
    expect(onChangeValue).toBeCalledWith('10', 'day')
  })
  it('has a maxlength of the placeholder length', () => {
    const onChangeValue = jest.fn()
    const { getByPlaceholderText } = render(
      <PartialDateInput
        identifier={DatePartType.DAY}
        onChangeValue={onChangeValue}
        placeholder="PP"
      />
    )
    const input = getByPlaceholderText('PP')

    expect(input.props.maxLength).toEqual(2)
  })
  describe('Bar behavior', () => {
    afterEach(() => jest.restoreAllMocks())

    it('should display a grey bar when empty', () => {
      const onChangeValue = jest.fn()
      const { getByTestId } = render(
        <PartialDateInput
          identifier={DatePartType.DAY}
          onChangeValue={onChangeValue}
          placeholder="PP"
        />
      )
      const validationBar = getByTestId('datepart-bar-day')

      const { backgroundColor, height } = validationBar.props.style[0]

      expect(backgroundColor).toEqual(ColorsEnum.GREY_MEDIUM)
      expect(height).toEqual(5)
    })
    it('should display a red_error bar when not empty && isValid=false', () => {
      const onChangeValue = jest.fn()
      const { getByTestId, getByPlaceholderText } = render(
        <PartialDateInput
          identifier={DatePartType.DAY}
          isValid={false}
          onChangeValue={onChangeValue}
          placeholder="PP"
        />
      )

      const input = getByPlaceholderText('PP')
      fireEvent.changeText(input, '10')

      const validationBar = getByTestId('datepart-bar-day')
      const { backgroundColor } = validationBar.props.style[0]

      expect(backgroundColor).toEqual(ColorsEnum.ERROR)
    })
    it('should display a green bar when  not empty && isValid=true', () => {
      const onChangeValue = jest.fn()
      const { getByTestId, getByPlaceholderText } = render(
        <PartialDateInput
          identifier={DatePartType.DAY}
          isValid
          onChangeValue={onChangeValue}
          placeholder="PP"
        />
      )

      const input = getByPlaceholderText('PP')
      fireEvent.changeText(input, '10')

      const validationBar = getByTestId('datepart-bar-day')
      const { backgroundColor } = validationBar.props.style[0]

      expect(backgroundColor).toEqual(ColorsEnum.GREEN_VALID)
    })
    it('should display a pink bar when focused', () => {
      const onChangeValue = jest.fn()
      const { getByTestId, getByPlaceholderText } = render(
        <PartialDateInput
          identifier={DatePartType.DAY}
          isValid
          onChangeValue={onChangeValue}
          placeholder="PP"
        />
      )

      const input = getByPlaceholderText('PP')
      fireEvent(input, 'focus')

      const validationBar = getByTestId('datepart-bar-day')
      const { backgroundColor } = validationBar.props.style[0]

      expect(backgroundColor).toEqual(ColorsEnum.PRIMARY)
    })
  })
})
