// TODO - share between FE and BE

export enum ContactType {
  EMAIL = 'Email',
  VOICE = 'Voice',
  TEXT = 'Text',
}

export enum RentalSpaces {
  NO_PREFERENCE = 'No Preference',
  MAIN_ROOM = 'Main Room',
  PARTY_BOAT = 'Party Boat',
  NORTH_PATIO = 'North Patio',
  NORTH_ROOM = 'North Room',
  GAME_ROOM = 'Game Room',
  SOUTH_ROOM = 'South Room',
  SOUTH_PATIO = 'South Patio',
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
  rentalSpaces: RentalSpaces[],
  headcount: number,
  notes: string,
}

export interface ReservationResponse {
  success: boolean,
}