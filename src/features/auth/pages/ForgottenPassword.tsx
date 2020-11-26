import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent, useState } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components/native'

import { api } from 'api/api'
import { NavigateToHomeWithoutModalOptions } from 'features/navigation/helpers'
import { UseNavigationType } from 'features/navigation/RootNavigator'
import { _ } from 'libs/i18n'
import { BottomCard } from 'ui/components/BottomCard'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { isEmailValid } from 'ui/components/inputs/emailCheck'
import { isValueEmpty } from 'ui/components/inputs/helpers'
import { TextInput } from 'ui/components/inputs/TextInput'
import { ModalHeader } from 'ui/components/modals/ModalHeader'
import { Background } from 'ui/svg/Background'
import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { Close } from 'ui/svg/icons/Close'
import { Warning } from 'ui/svg/icons/Warning'
import { ColorsEnum, getSpacing, Spacer, Typo } from 'ui/theme'

export const ForgottenPassword: FunctionComponent = () => {
  const [email, setEmail] = useState('')
  const [hasError, setHasError] = useState(false)

  const shouldDisableValidateButton = isValueEmpty(email)

  const { navigate } = useNavigation<UseNavigationType>()

  function onBackNavigation() {
    navigate('Login')
  }

  function onClose() {
    navigate('Home', NavigateToHomeWithoutModalOptions)
  }

  async function validateEmail() {
    if (isEmailValid(email)) {
      await api
        .nativeV1RequestPasswordResetPost({ email })
        .then(() => {
          navigate('ResetPasswordEmailSent', { email })
        })
        .catch((err) => {
          Alert.alert(err.message)
        })
    } else {
      setHasError(true)
    }
  }

  return (
    <React.Fragment>
      <Background />
      <BottomCard>
        <ModalHeader
          title={_(t`Mot de passe oublié`)}
          leftIcon={ArrowPrevious}
          onLeftIconPress={onBackNavigation}
          rightIcon={Close}
          onRightIconPress={onClose}
        />
        <ModalContent>
          <CenteredText>
            <Typo.Body>
              {_(
                t`Saisis ton adresse e-mail pour recevoir un lien qui te permettra de réinitialiser ton mot de passe !`
              )}
            </Typo.Body>
          </CenteredText>
          <Spacer.Column numberOfSpaces={4} />
          <StyledInput>
            <Typo.Body>{_(t`Adresse e-mail`)}</Typo.Body>
            <Spacer.Column numberOfSpaces={2} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={_(/*i18n: email placeholder */ t`tonadresse@email.com`)}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
            />
            {hasError && (
              <React.Fragment>
                <Spacer.Column numberOfSpaces={1} />
                <StyledInline>
                  <Warning size={24} />
                  <Spacer.Row numberOfSpaces={1} />
                  <Typo.Caption color={ColorsEnum.ERROR}>
                    {_(t`Format de l'e-mail incorrect`)}
                  </Typo.Caption>
                </StyledInline>
              </React.Fragment>
            )}
          </StyledInput>
          <Spacer.Column numberOfSpaces={6} />
          <ButtonPrimary
            title={_(t`Valider`)}
            onPress={validateEmail}
            disabled={shouldDisableValidateButton}
          />
        </ModalContent>
      </BottomCard>
    </React.Fragment>
  )
}

const ModalContent = styled.View({
  paddingTop: getSpacing(7),
  alignItems: 'center',
  width: '100%',
})

const CenteredText = styled.Text({
  textAlign: 'center',
})

const StyledInput = styled.View({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  maxWidth: getSpacing(125),
})

const StyledInline = styled.View({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  maxWidth: getSpacing(125),
})
