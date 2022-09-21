// export type Breakpoints = 'zero' | 'min' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'ws' | 'hd';

export enum BreakpointsEnum {
  zero = 'zero',
  min = 'min',
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  ws = 'ws',
  hd = 'hd',
};
export const breakpoints: Map<BreakpointsEnum, string> = new Map([
  [BreakpointsEnum.zero, '(min-width: 0px)'],
  [BreakpointsEnum.min, '(min-width: 320px)'],
  [BreakpointsEnum.xs, '(min-width: 440px)'],
  [BreakpointsEnum.sm, '(min-width: 600px)'],
  [BreakpointsEnum.md, '(min-width: 840px)'],
  [BreakpointsEnum.lg, '(min-width: 1024px)'],
  [BreakpointsEnum.xl, '(min-width: 1280px)'],
  [BreakpointsEnum.ws, '(min-width: 1440px)'],
  [BreakpointsEnum.hd, '(min-width: 1920px)'],
]);

export enum Orientations {
  LANDSCAPE,
  PORTRAIT,
};

export interface ViewportState {
  previousBreakpoint: BreakpointsEnum,
  currentBreakpoint: BreakpointsEnum,
  orientation: Orientations,
}