import { t } from '@lingui/macro'
import React from 'react'
import { Platform } from 'react-native'

import { CategoryType } from 'api/gen'
import { BookingDetails } from 'features/bookOffer/components/BookingDetails'
import { BookingEventChoices } from 'features/bookOffer/components/BookingEventChoices'
import { useOffer } from 'features/offer/api/useOffer'
import { _ } from 'libs/i18n'
import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { IconInterface } from 'ui/svg/icons/types'

import { BookingImpossible } from '../components/BookingImpossible'
import { useBooking } from '../pages/BookingOfferWrapper'
import { Step } from '../pages/reducer'

export const useModalContent = (
  dismissModal: () => void
): {
  children: Element
  title: string
  leftIcon: React.FC<IconInterface> | undefined
  onLeftIconPress: (() => void) | undefined
} => {
  const { bookingState, dispatch } = useBooking()
  const { data: offer } = useOffer({ offerId: bookingState.offerId || 0 })

  const children = <React.Fragment />
  const title = ''
  const leftIcon: React.FC<IconInterface> | undefined = undefined
  const onLeftIconPress = undefined

  if (!offer) return { children, title, leftIcon, onLeftIconPress }
  const { category, isDigital } = offer

  const goToPreviousStep = () => {
    dispatch({ type: 'MODIFY_OPTIONS' })
  }

  if (category.categoryType === CategoryType.Thing) {
    if (isDigital && Platform.OS === 'ios') {
      return {
        title: _(t`Réservation impossible`),
        leftIcon: undefined,
        onLeftIconPress: undefined,
        children: <BookingImpossible dismissModal={dismissModal} />,
      }
    }

    return {
      title: _(t`Détails de la réservation`),
      leftIcon: ArrowPrevious,
      onLeftIconPress: dismissModal,
      children: <BookingDetails dismissModal={dismissModal} />,
    }
  }

  if (bookingState.step !== Step.CONFIRMATION) {
    return {
      title: '',
      leftIcon: undefined,
      onLeftIconPress: undefined,
      children: <BookingEventChoices dismissModal={dismissModal} />,
    }
  }

  return {
    title: _(t`Détails de la réservation`),
    leftIcon: ArrowPrevious,
    onLeftIconPress: goToPreviousStep,
    children: <BookingDetails dismissModal={dismissModal} />,
  }
}
