import { CategoryNameEnum } from 'api/gen'

interface Offer {
  author?: string | null
  category: CategoryNameEnum | null
  dateCreated?: number
  dates?: number[]
  description?: string | null
  id: string
  isbn?: string | null
  isDigital?: boolean
  isDuo?: boolean
  isEvent?: boolean
  isThing?: boolean
  label?: string
  musicSubType?: string | null
  musicType?: string | null
  name?: string
  performer?: string | null
  prices?: number[]
  priceMin?: number
  priceMax?: number
  showSubType?: string | null
  showType?: string | null
  speaker?: string | null
  stageDirector?: string | null
  stocksDateCreated?: number[]
  thumbUrl?: string
  tags?: string[]
  times?: number[]
  type?: string
  visa?: string | null
  withdrawalDetails?: string | null
}

interface Offerer {
  name?: string
}

interface Venue {
  city?: string | null
  departementCode?: string | null
  name?: string | null
  publicName?: string | null
}

export interface Geoloc {
  lat?: number | null
  lng?: number | null
}

export interface AlgoliaHit {
  offer: Offer
  offerer: Offerer
  venue: Venue
  _geoloc: Geoloc
  objectID: string
}

type PartialOffer = Pick<
  Offer,
  'category' | 'dates' | 'id' | 'description' | 'thumbUrl' | 'isDuo' | 'name' | 'prices'
>
export interface SearchAlgoliaHit {
  offer: PartialOffer
  objectID: string
  _geoloc: Geoloc
}
