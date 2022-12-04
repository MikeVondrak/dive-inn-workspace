export enum IconCardImages {
  MAP_MARKER,
  CLOCK,
  AT_SIGN,
  BOTTLE,
}

export enum IconCardTextSizes {
  SMALL,
  LARGE
}
export interface IconCardTextConfig {
  uiLabel: string,
  size: IconCardTextSizes,
}

export interface IconCardConfig {
  iconCardImage: IconCardImages,
  textLines?: IconCardTextConfig[],
}

export const iconCardConfigDefault: IconCardConfig = {
  iconCardImage: IconCardImages.CLOCK,
  textLines: [],
}