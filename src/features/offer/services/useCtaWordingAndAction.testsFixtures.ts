export const notExpiredStock = {
  id: 118929,
  beginningDatetime: new Date('2021-01-01T13:30:00'),
  bookingLimitDatetime: new Date('2021-01-05T13:30:00'),
  price: 500,
  isBookable: true,
}

const notExpiredStockNoLimitDate = {
  id: 118928,
  beginningDatetime: new Date('2021-01-02T18:00:00'),
  price: 500,
  isBookable: true,
}

export const expiredStock1 = {
  id: 118929,
  beginningDatetime: new Date('2021-01-01T13:30:00'),
  bookingLimitDatetime: new Date('2021-01-03T13:30:00'),
  price: 500,
  isBookable: true,
}
export const expiredStock2 = {
  id: 118928,
  beginningDatetime: new Date('2021-01-02T18:00:00'),
  bookingLimitDatetime: new Date('2021-01-03T13:30:00'),
  price: 500,
  isBookable: true,
}

export const soldOutStock = {
  id: 118929,
  beginningDatetime: new Date('2021-01-01T13:30:00'),
  bookingLimitDatetime: new Date('2021-01-05T13:30:00'),
  price: 500,
  isBookable: false,
}

const notSoldOutStock = {
  id: 118929,
  beginningDatetime: new Date('2021-01-01T13:30:00'),
  bookingLimitDatetime: new Date('2021-01-05T13:30:00'),
  price: 500,
  isBookable: true,
}

export const expiredOffer = {
  stocks: [expiredStock1, expiredStock2],
}

export const notExpiredOffer = {
  stocks: [notExpiredStock, expiredStock2],
}

export const notExpiredOfferNoLimitDate = {
  stocks: [expiredStock1, notExpiredStockNoLimitDate],
}

export const soldOutOffer = {
  stocks: [soldOutStock],
}

export const notSoldOutOffer = {
  stocks: [soldOutStock, notSoldOutStock],
}
