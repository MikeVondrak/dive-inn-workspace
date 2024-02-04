// TODO - share between FE and BE

export enum ContactType {
  EMAIL = 'Email',
  VOICE = 'Voice',
  TEXT = 'Text',
}

export enum RentalSpaces {
  NO_PREFERENCE = 'No Preference',
  MAIN_ROOM = 'The Galley',
  PARTY_BOAT = 'The Boat',
  NORTH_PATIO = 'The Cabana',
  NORTH_ROOM = 'The Saloon',
  FRONT_PATIO = 'The Oasis',
  SOUTH_ROOM = 'The Cabin',
  SOUTH_PATIO = 'The Deck',
}

export interface Reservation {
  theme?: string,
  birthday?: {
    name?: string,
    age?: number,
  },
  organizer: {
    name: string,
    phoneNumber?: number,
    email?: string,
    preferredContact: ContactType,
  },
  date: string,
  startTime: string,
  endTime: string,
  // rentalSpaces: RentalSpaces[],
  headcount: number,
  notes: string,
}

export interface ReservationResponse {
  success: boolean,
}