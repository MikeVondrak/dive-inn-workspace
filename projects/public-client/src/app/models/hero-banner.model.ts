import { BreakpointsEnum, Orientations } from "@dive-inn-lib";

export type Coord = [x: string, y: string];

export interface HeroBannerConfig {
  width?: string, // TODO: may not need
  height?: string, // TODO: may not need
  bgSize?: string,
  bgPosition?: string,
  textWidth?: string,
  textTop?: string,
  textLeft?: string,
  textContainerTransform?: string,
  textTransform?: string,
  textAlign?: string,
}

export type HeroBannerBreakpointConfigs = Map<BreakpointsEnum, HeroBannerConfig>;

export type HeroBannerOrientationConfigs = Map<Orientations, HeroBannerBreakpointConfigs>;

