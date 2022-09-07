import { Breakpoints, Orientations } from "@dive-inn-lib";

export type Coord = [x: string, y: string];

export interface HeroBannerConfig {
  width?: string,
  height?: string,
  bgSize?: string,
  bgPosition?: string,
  textWidth?: string,
  textTop?: string,
  textLeft?: string,
  textContainerTransform?: string,
  textTransform?: string,
  textAlign?: string,
}

export type HeroBannerBreakpointConfigs = Map<Breakpoints, HeroBannerConfig>;

export type HeroBannerOrientationConfigs = Map<Orientations, HeroBannerBreakpointConfigs>;

