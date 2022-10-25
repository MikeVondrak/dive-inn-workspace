import { BreakpointsEnum, Orientations } from "@dive-inn-lib";
import { HeroBannerConfig } from "../../models/hero-banner.model";

/****************** LANDSCAPE *******************/

const landscape_zero: HeroBannerConfig = {
  bgPosition: '40% 0vw',
  bgSize: '150%',
  textPaddingTop: '50vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '50vw',
};
const landscape_md: HeroBannerConfig = {
  bgPosition: '35% 0vw',
  bgSize: '130%',  
  textPaddingTop: '40vw',
  textPaddingBottom: '52vw'
};
const landscape_lg: HeroBannerConfig = {
  //bgSize: '133%',
  //bgPosition: '-22vw 22px',
  textPaddingBottom: '52vw'
}
const landscape_xl: HeroBannerConfig = {
  // textPaddingBottom: '30vw',
  // bgSize: '110%',
  // bgPosition: '-1vw 0vw',
}
const landscape_ws: HeroBannerConfig = {
  textPaddingBottom: '37vw',
  bgSize: '115%',
  bgPosition: '-3.25vw 2vw',
}

/******************** PORTRAIT *********************/

const portrait_zero: HeroBannerConfig = {
  bgPosition: '44.5% -1vw',
  bgSize: 'cover',
  textLeft: '25vw',
  textAlign: 'center',
  textContainerTransform: '',
  textTransform: 'skew(18deg, 9deg) rotate(18deg)',
  textWidth: '50vw',
  textSize: '6vw',
  textPaddingTop: '100vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '80vw',
};
const portrait_min: HeroBannerConfig = { // 320px
  bgPosition: '44.5% -6.5vw',
  textPaddingTop: '100vw',
  textPaddingBottom: '80vw',
};
const portrait_xs: HeroBannerConfig = { // 440px
  bgPosition: '42.5% 9.5vw',
  bgSize: '180%',
  textPaddingTop: '70vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '70vw',
};
const portrait_sm: HeroBannerConfig = { // 600px
  bgSize: '140%',
  bgPosition: '38% 5.5vw',  
  textPaddingTop: '50vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '58vw',
};
const portrait_md: HeroBannerConfig = { // 840px
  bgSize: '120%',
  bgPosition: '30% 4vw',
  textPaddingTop: '40vw',
  textPaddingBottom: '45vw'
};

/************* EXPORT ***************/

export const constructionPageHeroBannerConfigs = new Map([
  [Orientations.LANDSCAPE, new Map([
    [BreakpointsEnum.zero, landscape_zero],
    [BreakpointsEnum.md, landscape_md],
    [BreakpointsEnum.lg, landscape_lg],
    [BreakpointsEnum.xl, landscape_xl],
    [BreakpointsEnum.ws, landscape_ws]
  ])
  ],
  [Orientations.PORTRAIT, new Map([
    [BreakpointsEnum.zero, portrait_zero],
    [BreakpointsEnum.min, portrait_min],
    [BreakpointsEnum.xs, portrait_xs],
    [BreakpointsEnum.sm, portrait_sm],
    [BreakpointsEnum.md, portrait_md],
  ])],
]);