export type Breakpoints = 'zero' | 'min' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'ws' | 'hd';
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
export enum Orientations {
  LANDSCAPE,
  PORTRAIT,
};

export interface ViewportState {
  previousBreakpoint: Breakpoints,
  currentBreakpoint: Breakpoints,
  orientation: Orientations,
}