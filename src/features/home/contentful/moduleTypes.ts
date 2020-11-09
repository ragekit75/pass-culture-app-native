import { AlgoliaParametersFields, DisplayParametersFields } from './contentful'

export class Offers {
  algolia: AlgoliaParametersFields
  display: DisplayParametersFields
  moduleId: string
  constructor({
    algolia,
    display,
    moduleId,
  }: {
    algolia: AlgoliaParametersFields
    display: DisplayParametersFields
    moduleId: string
  }) {
    this.algolia = algolia
    this.display = display
    this.moduleId = moduleId
  }
}

export class OffersWithCover extends Offers {
  cover: string | null
  constructor({
    algolia,
    cover,
    display,
    moduleId,
  }: {
    algolia: AlgoliaParametersFields
    display: DisplayParametersFields
    cover: string | null
    moduleId: string
  }) {
    super({ algolia, display, moduleId })
    this.cover = cover
  }
}

export class ExclusivityPane {
  alt: string
  image: string
  offerId: string
  moduleId: string
  constructor({
    alt,
    image,
    offerId,
    moduleId,
  }: {
    alt: string
    image: string
    offerId: string
    moduleId: string
  }) {
    this.alt = alt
    this.image = image
    this.offerId = offerId
    this.moduleId = moduleId
  }
}

export class BusinessPane {
  firstLine: string | undefined
  image: string
  secondLine: string | undefined
  url: string | undefined
  moduleId: string
  constructor({
    firstLine,
    image,
    secondLine,
    url,
    moduleId,
  }: {
    firstLine: string | undefined
    image: string
    secondLine: string | undefined
    url: string | undefined
    moduleId: string
  }) {
    this.firstLine = firstLine
    this.image = image
    this.secondLine = secondLine
    this.url = url
    this.moduleId = moduleId
  }
}

export type ProcessedModule = Offers | ExclusivityPane | BusinessPane | OffersWithCover
