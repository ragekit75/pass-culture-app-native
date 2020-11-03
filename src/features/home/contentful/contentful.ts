export const CONTENT_TYPES = {
  ALGOLIA: 'algolia',
  ALGOLIA_PARAMETERS: 'algoliaParameters',
  DISPLAY_PARAMETERS: 'displayParameters',
  EXCLUSIVITY: 'exclusivity',
  HOMEPAGE: 'homepage',
  INFORMATION: 'information',
  BUSINESS: 'business',
}

export enum ContentTypes {
  ALGOLIA = 'algolia',
  ALGOLIA_PARAMETERS = 'algoliaParameters',
  EXCLUSIVITY = 'exclusivity',
  DISPLAY = 'display',
  DISPLAY_PARAMETERS = 'displayParameters',
  HOMEPAGE = 'homepage',
  INFORMATION = 'information',
  BUSINESS = 'business',
}

interface Entry<T, ContentType> {
  sys: Sys<ContentType>
  fields: T
  update(): Promise<Entry<T, ContentType>>
}

interface EntryCollectionInclusions<T, ContentType> {
  string: Array<Asset<ContentType> | Entry<T, ContentType>>
}

interface EntryCollection<T, ContentType> extends ContentfulCollection<Entry<T, ContentType>> {
  errors?: Array<EntryCollectionError>
  includes?: EntryCollectionInclusions<T, ContentType>
}

interface EntryFields {
  modules: Array<{ sys: EntryTypeLink }>
  title: string
}

interface ContentfulCollection<T> {
  total: number
  skip: number
  limit: number
  items: Array<T>
}

interface Asset<ContentType> {
  sys: Sys<ContentType>
  fields: {
    title: string
    description: string
    file: {
      url: string
      details: {
        size: number
        image?: {
          width: number
          height: number
        }
      }
      fileName: string
      contentType: ContentType
    }
  }
}

interface Sys<ContentType> {
  type: string
  id: string
  createdAt: string
  updatedAt: string
  environment: { sys: { id: string; type: string; linkType: string } }
  locale: string
  revision?: number
  space?: {
    sys: SpaceLink
  }
  contentType?: {
    sys: {
      type: string
      linkType: string
      id: ContentType
    }
  }
}

interface SpaceLink {
  type: string
  linkType: string
  id: string
}

interface EntryTypeLink {
  type: string
  linkType: string
  id: string
}

interface EntryCollectionError {
  sys: {
    id: string
    type: string
  }
  details: {
    type: string
    linkType: string
    id: string
  }
}

interface AlgoliaParameters {
  sys: Sys<typeof CONTENT_TYPES.ALGOLIA>
  fields: AlgoliaParametersFields
}

interface DisplayParameters {
  sys: Sys<typeof CONTENT_TYPES.DISPLAY_PARAMETERS>
  fields: DisplayParametersFields
}

interface Cover {
  sys: Sys<typeof CONTENT_TYPES.INFORMATION>
  fields: CoverFields
}

// Taken from https://app.contentful.com/spaces/2bg01iqy0isv/content_types/cover/fields
interface CoverFields {
  title: string
  image: Image
}

// Taken from https://app.contentful.com/spaces/2bg01iqy0isv/content_types/algolia/fields
interface AlgoliaFields {
  title: string
  algoliaParameters: AlgoliaParameters
  displayParameters: DisplayParameters
  cover?: Cover
}

// Taken from https://app.contentful.com/spaces/2bg01iqy0isv/content_types/algoliaParameters/fields
interface AlgoliaParametersFields {
  title: string
  isGeolocated?: boolean
  aroundRadius?: number
  categories?: string[]
  tags?: string[]
  isDigital?: boolean
  isThing?: boolean
  isEvent?: boolean
  beginningDatetime?: string
  endingDatetime?: string
  isFree?: boolean
  priceMin?: number
  priceMax?: number
  isDuo?: boolean
  newestOnly?: boolean
  hitsPerPage: number
}

// Taken from https://app.contentful.com/spaces/2bg01iqy0isv/content_types/displayParameters/fields
interface DisplayParametersFields {
  title: string
  layout: string
  minOffers: number
}

// Taken from https://app.contentful.com/spaces/2bg01iqy0isv/content_types/business/fields
interface BusinessFields {
  title: string
  firstLine?: string
  secondLine?: string
  image: Image
  url?: string
}

// Taken from https://app.contentful.com/spaces/2bg01iqy0isv/content_types/exclusivity/fields
interface ExclusivityFields {
  title: string
  alt: string
  image: Image
  offerId: string
}

// Taken from https://app.contentful.com/spaces/2bg01iqy0isv/content_types/homepage/fields
interface HomepageFields {
  title: string
  modules: HomepageModule[]
}

type HomepageModule =
  | { sys: Sys<'algolia'>; fields: AlgoliaFields }
  | { sys: Sys<'business'>; fields: BusinessFields }
  | { sys: Sys<'exclusivity'>; fields: ExclusivityFields }

interface Image {
  sys: Sys<typeof CONTENT_TYPES.INFORMATION>
  fields: {
    title: string
    description?: string
    file: {
      url: string
      details: {
        size: number
        image: {
          width: number
          height: number
        }
      }
      fileName: string
      contentType: string
    }
  }
}

interface HomepageEntries {
  sys: Sys<typeof CONTENT_TYPES.HOMEPAGE>
  fields: HomepageFields
}

export type {
  HomepageModule,
  AlgoliaFields,
  AlgoliaParameters,
  AlgoliaParametersFields,
  BusinessFields,
  Cover,
  DisplayParametersFields,
  EntryCollection,
  EntryFields,
  ExclusivityFields,
  CoverFields,
  Image,
  HomepageEntries,
}