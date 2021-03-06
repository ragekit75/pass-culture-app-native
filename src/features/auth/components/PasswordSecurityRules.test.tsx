import { render } from '@testing-library/react-native'
import React from 'react'

import { PasswordSecurityRules } from 'features/auth/components/PasswordSecurityRules'

describe('<PasswordSecurityRules />', () => {
  it('should display 5 rules', async () => {
    const { queryByText } = render(<PasswordSecurityRules password={''} />)
    expect(queryByText('12 Caractères')).toBeTruthy()
    expect(queryByText('1 Majuscule')).toBeTruthy()
    expect(queryByText('1 Minuscule')).toBeTruthy()
    expect(queryByText('1 Chiffre')).toBeTruthy()
    expect(queryByText('1 Caractère spécial (!@#$%^&*...)')).toBeTruthy()
  })

  it('should not validate any rules if input is empty', () => {
    const notValidatedRules = render(<PasswordSecurityRules password={''} />)
    const closeIcons = notValidatedRules.getAllByTestId('rule-icon-close')
    expect(closeIcons.length).toBe(5)
  })

  it('should validate capital rule', () => {
    const validateCapitalRule = render(<PasswordSecurityRules password={'A'} />)
    const checkIcons = validateCapitalRule.getAllByTestId('rule-icon-check')
    expect(checkIcons.length).toBe(1)
    const closeIcons = validateCapitalRule.getAllByTestId('rule-icon-close')
    expect(closeIcons.length).toBe(4)
  })

  it('should validate lowercase rule', () => {
    const validateLowerCaseRule = render(<PasswordSecurityRules password={'a'} />)
    const checkIcons = validateLowerCaseRule.getAllByTestId('rule-icon-check')
    expect(checkIcons.length).toBe(1)
    const closeIcons = validateLowerCaseRule.getAllByTestId('rule-icon-close')
    expect(closeIcons.length).toBe(4)
  })

  it('should validate number rule', () => {
    const validateNumberRule = render(<PasswordSecurityRules password={'1'} />)
    const checkIcons = validateNumberRule.getAllByTestId('rule-icon-check')
    expect(checkIcons.length).toBe(1)
    const closeIcons = validateNumberRule.getAllByTestId('rule-icon-close')
    expect(closeIcons.length).toBe(4)
  })

  it('should validate special character rule', () => {
    const validateSpecialCharRule = render(<PasswordSecurityRules password={'!'} />)
    const checkIcons = validateSpecialCharRule.getAllByTestId('rule-icon-check')
    expect(checkIcons.length).toBe(1)
    const closeIcons = validateSpecialCharRule.getAllByTestId('rule-icon-close')
    expect(closeIcons.length).toBe(4)
  })

  it('should validate every rule if password is correct', () => {
    const validateEveryRule = render(<PasswordSecurityRules password={'ABCDefgh1234!!!!'} />)
    const checkIcons = validateEveryRule.getAllByTestId('rule-icon-check')
    expect(checkIcons.length).toBe(5)
  })
})
