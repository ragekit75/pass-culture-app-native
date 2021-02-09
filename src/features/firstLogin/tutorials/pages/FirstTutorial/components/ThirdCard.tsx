import { t } from '@lingui/macro'
import React, { RefObject } from 'react'
import Swiper from 'react-native-web-swiper'

import { CardKey, GenericCard } from 'features/firstLogin/tutorials/components/GenericCard'
import { analytics } from 'libs/analytics'
import { useGeolocation } from 'libs/geolocation'
import { _ } from 'libs/i18n'
import GeolocationAnimation from 'ui/animations/geolocalisation.json'

export const useOnSubmitThirdCard = (swiperRef?: RefObject<Swiper>) => {
  return () => {
    analytics.logHasActivateGeolocFromTutorial()
    swiperRef?.current?.goToNext()
  }
}

export function ThirdCard(props: CardKey) {
  const { requestGeolocPermission } = useGeolocation()
  const onSubmit = useOnSubmitThirdCard(props.swiperRef)

  async function onGeolocationButtonPress() {
    await requestGeolocPermission({
      onSubmit: onSubmit,
    })
  }

  return (
    <GenericCard
      animation={GeolocationAnimation}
      buttonCallback={onGeolocationButtonPress}
      buttonText={_(t`Activer la géolocalisation`)}
      pauseAnimationOnRenderAtFrame={62}
      subTitle={_(t`à portée de main !`)}
      text={_(
        t`Active la géolocalisation pour découvrir toutes les offres existantes autour de toi.`
      )}
      title={_(t`Toute la culture`)}
      {...props}
    />
  )
}