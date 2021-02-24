import { t } from '@lingui/macro'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'

import {
  isPasswordCorrect,
  PasswordSecurityRules,
} from 'features/auth/components/PasswordSecurityRules'
import { useChangePasswordMutation } from 'features/auth/mutations'
import { _ } from 'libs/i18n'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { InputError } from 'ui/components/inputs/InputError'
import { PasswordInput } from 'ui/components/inputs/PasswordInput'
import { SNACK_BAR_TIME_OUT, useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'
import { getSpacing, Spacer, Typo } from 'ui/theme'

import { ProfileHeaderWithNavigation } from '../components/ProfileHeaderWithNavigation'
import { ProfileContainer } from '../components/reusables'

export function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [hasError, setHasError] = useState(false)

  const displayNotMatchingError = confirmedPassword.length > 0 && confirmedPassword !== newPassword

  const shouldSave =
    isPasswordCorrect(currentPassword) &&
    isPasswordCorrect(newPassword) &&
    confirmedPassword === newPassword

  // on type, reset error field
  useEffect(() => {
    if (hasError) {
      setHasError(false)
    }
  }, [currentPassword, newPassword, confirmedPassword])

  const { displaySuccessSnackBar } = useSnackBarContext()
  const { mutate: changePassword, isLoading } = useChangePasswordMutation(
    () => {
      setCurrentPassword('')
      setNewPassword('')
      setConfirmedPassword('')
      displaySuccessSnackBar({
        message: _(t`Mot de passe modifié`),
        timeout: SNACK_BAR_TIME_OUT,
      })
    },
    () => setHasError(true)
  )

  function submitPassword() {
    changePassword({ currentPassword, newPassword })
  }

  return (
    <React.Fragment>
      <ProfileHeaderWithNavigation title={_(t`Mot de passe`)} />
      <Container>
        <StyledInput>
          <Typo.Body>{_(t`Mot de passe actuel`)}</Typo.Body>
          <Spacer.Column numberOfSpaces={2} />
          <PasswordInput
            value={currentPassword}
            autoFocus={true}
            onChangeText={setCurrentPassword}
            placeholder={_(/*i18n: password placeholder */ t`Ton mot de passe actuel`)}
          />
          <Spacer.Column numberOfSpaces={2} />
          <InputError visible={hasError} messageId="Mot de passe incorrect" numberOfSpacesTop={0} />
        </StyledInput>
        <Spacer.Column numberOfSpaces={5} />
        <StyledInput>
          <Typo.Body>{_(t`Nouveau mot de passe`)}</Typo.Body>
          <Spacer.Column numberOfSpaces={2} />
          <PasswordInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder={_(/*i18n: password placeholder */ t`Ton mot de passe`)}
          />
          <PasswordSecurityRules password={newPassword} />
        </StyledInput>
        <Spacer.Column numberOfSpaces={5} />
        <StyledInput>
          <Typo.Body>{_(t`Confirmer le mot de passe`)}</Typo.Body>
          <Spacer.Column numberOfSpaces={2} />
          <PasswordInput
            value={confirmedPassword}
            onChangeText={setConfirmedPassword}
            placeholder={_(/*i18n: password placeholder */ t`Confirmer le mot de passe`)}
          />
        </StyledInput>
        <Spacer.Column numberOfSpaces={2} />
        <InputError
          visible={displayNotMatchingError}
          messageId="les mots de passe ne concordent pas"
          numberOfSpacesTop={0}
        />
        <Spacer.Flex flex={1} />
        <ButtonPrimary
          title={_(t`Enregistrer`)}
          onPress={submitPassword}
          disabled={!shouldSave || isLoading}
        />
      </Container>
    </React.Fragment>
  )
}

const StyledInput = styled.View({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  maxWidth: getSpacing(125),
})

const Container = styled(ProfileContainer)({
  padding: getSpacing(4),
})
