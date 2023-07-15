export enum CarouselPaneViewModes {
  NORMAL,
  FULL_SCREEN,
}

export enum CarouselPaneGradientTypes {
  NONE,
  LEFT,
  RIGHT,
  FULL,
}

export enum CarouselPaneFaceDirections {
  S = 's',
  SE = 'se',
  E = 'e',
  NE = 'ne',
  N = 'n',
  NW = 'nw',
  W = 'w',
  SW = 'sw',
}

export interface CarouselData {
  backgroundImage?: string,
  title?: string,
  description?: string,
  icon?: string,
}