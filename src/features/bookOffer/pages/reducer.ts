export enum Step {
  DATE,
  HOUR,
  DUO,
  CONFIRMATION,
}

export type BookingState = {
  offerId: number | undefined
  stockId: number | undefined
  step: Step | undefined
}

export const initialBookingState: BookingState = {
  offerId: undefined,
  stockId: undefined,
  step: undefined,
}

export type Action =
  | { type: 'INIT'; payload: Partial<BookingState> }
  | { type: 'VALIDATE_OPTIONS' }
  | { type: 'MODIFY_OPTIONS' }
  | { type: 'SELECT_STOCK'; payload: number }

export const searchReducer = (state: BookingState, action: Action): BookingState => {
  switch (action.type) {
    case 'INIT':
      return { ...initialBookingState, ...action.payload }
    case 'VALIDATE_OPTIONS':
      return { ...state, step: Step.CONFIRMATION }
    case 'SELECT_STOCK':
      return { ...state, stockId: action.payload }
    case 'MODIFY_OPTIONS':
      return { ...state, step: Step.DUO }
    default:
      return state
  }
}
