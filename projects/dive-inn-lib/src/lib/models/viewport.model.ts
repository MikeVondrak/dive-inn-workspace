export type Breakpoints = 'zero' | 'min' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'ws' | 'hd';
export enum BreakpointsEnum {
  zero, min, xs, sm, md, lg, xl, ws, hd
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