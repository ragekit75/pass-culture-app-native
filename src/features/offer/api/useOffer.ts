import { useQuery } from 'react-query'

import { api } from 'api/api'
import { OfferResponse } from 'api/gen'

interface OfferAdaptedResponse extends OfferResponse {
  fullAddress: string | null
}

interface UseOfferInterface {
  offerId: number | null
}

const isNotEmpty = (text: string | undefined) => text !== undefined && text !== ''

export const formatFullAddress = (
  publicName: string | undefined,
  name: string,
  address: string | undefined,
  postalCode: string | undefined,
  city: string | undefined
) => {
  let fullAddress = `${publicName || name}`
  if (isNotEmpty(address) && isNotEmpty(city)) fullAddress = fullAddress.concat(`, ${address}`)
  if (isNotEmpty(city)) {
    if (isNotEmpty(postalCode)) fullAddress = fullAddress.concat(`, ${postalCode} ${city}`)
    else fullAddress = fullAddress.concat(`, ${city}`)
  }
  return fullAddress
}

const adaptOfferResponse = (offerApiResponse: OfferResponse): OfferAdaptedResponse => ({
  ...offerApiResponse,
  fullAddress: formatFullAddress(
    offerApiResponse.venue.publicName,
    offerApiResponse.venue.name,
    offerApiResponse.venue.address,
    offerApiResponse.venue.postalCode,
    offerApiResponse.venue.city
  ),
})

const getOfferById = async (offerId: string) => {
  const offerApiResponse = await api.getnativev1offerofferId(offerId.toString())
  return adaptOfferResponse(offerApiResponse)
}

export const useOffer = ({ offerId }: UseOfferInterface) => {
  return useQuery<OfferAdaptedResponse>(
    ['offer', offerId],
    //@ts-ignore: Query is enabled only if offerId is truthy
    () => getOfferById(offerId.toString()),
    { enabled: !!offerId }
  )
}