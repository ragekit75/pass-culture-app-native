import { t } from '@lingui/macro'
import React, { useState } from 'react'
import styled from 'styled-components/native'

import { PasswordSecurityRules } from 'features/auth/components/PasswordSecurityRules'
import { _ } from 'libs/i18n'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { InputError } from 'ui/components/inputs/InputError'
import { PasswordInput } from 'ui/components/inputs/PasswordInput'
import { getSpacing, Spacer, Typo } from 'ui/theme'

import { ProfileHeaderWithNavigation } from '../components/ProfileHeaderWithNavigation'
import { ProfileContainer } from '../components/reusables'

export function ChangePassword() {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')

  const displayNotMatchingError = confirmedPassword.length > 0 && confirmedPassword !== password

  return (
    <React.Fragment>
      <ProfileHeaderWithNavigation title={_(t`Mot de passe`)} />
      <Container>
        <StyledInput>
          <Typo.Body>{_(t`Mot de passe actuel`)}</Typo.Body>
          <Spacer.Column numberOfSpaces={2} />
          <PasswordInput
            value={password}
            autoFocus={true}
            onChangeText={setPassword}
            placeholder={_(/*i18n: password placeholder */ t`Ton mot de passe actuel`)}
          />
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
        <ButtonPrimary title={_(t`Enregistrer`)} onPress={() => ({})} disabled={false} />
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
