export interface Special {
  fileUrl: string,
  title: string,
  description: string,
}

export interface SpecialsResponse {
  status: string,
  specials: Special[],
}