import { AnimationEvent } from "@angular/animations";

export enum RentalSpaces {
  DEFAULT = 'WholeMap',
  LEGEND = 'Legend',
  SPACE1 = 'TheOasis',
  SPACE2 = 'TheBoat',
  SPACE3 = 'TheGalley',
  SPACE4 = 'TheCabin',
  SPACE5 = 'TheDeck',
  SPACE6 = 'TheSaloon',
  SPACE7 = 'TheCabana',
}

export enum OpacityAnimationStates {
  HIDDEN = 'hidden',
  SHOWING = 'showing'
}

export interface RentalSpaceOverlayAnimationEvent {
  event: AnimationEvent, 
  overlayId: RentalSpaces,
}

export interface RentalSpaceOverlayPositionCss {
  info: string[], 
  aside: string[],
}