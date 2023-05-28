export enum ReservationSpaces {
  Boat, 
  MainRoom, 
  NorthPatio, 
  NorthRoom, 
  GameRoom, 
  SouthRoom, 
  SouthPatio
}

export interface ReservationRequest {
  organizerName: string,
  phoneNumber: number,
  email: string,
  theme: string,
  isBirthday: boolean,
  honoreeName: string,
  honoreeAge: string,
  date: Date,
  startTime: Date,
  endTime: Date,
  headcount: number,
  spaces: ReservationSpaces[],
  notes: string,
}