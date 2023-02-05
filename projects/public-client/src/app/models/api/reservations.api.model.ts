export enum ContactType {
  EMAIL = "EMAIL",
  VOICE = "VOICE",
  TEXT = "TEXT",
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
    name: string,
    age: number,
  },
  organizer: {
    name: string,
    voice?: number,
    text?: number,
    email?: string,
    preferredContact: ContactType,
  },
  rentalSpaces: RentalSpaces[],
  headcount: number,
  notes: string,
}