import { BreakpointsEnum, Orientations } from "@dive-inn-lib";
import { HeroBannerConfig } from "../../models/hero-banner.model";

/****************** LANDSCAPE *******************/

const landscape_zero: HeroBannerConfig = {
  bgPosition: '81% -21vw',
  bgSize: '175%',
  textLeft: '0vw',
  textTop: '-10vw',
  textAlign: 'center',
  textContainerTransform: '',
  textTransform: 'skew(-12deg, -6deg) rotate(-6deg)',
  textWidth: '70vw',
  textSize: '5vw',
  textPaddingTop: '40vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '20vw',
};
const landscape_sm: HeroBannerConfig = {
  textPaddingTop: '45vw',
  textPaddingBottom: '15vw',
}
const landscape_md: HeroBannerConfig = {
  textSize: '4vw',
  textWidth: '50vw',
  bgPosition: '82% -10vw',
  bgSize: '125%',
  textTop: '-15vw',
  textLeft: '5vw',
  textAlign: 'center',
  textPaddingTop: '35vw',
  textPaddingBottom: '10vw'
};
const landscape_lg: HeroBannerConfig = {
  bgSize: '100%',
  bgPosition: '60% -10vw',
  textPaddingTop: '28vw',
  textPaddingBottom: '2vw'
}
// const landscape_xl: HeroBannerConfig = {
//   textPaddingBottom: '10vw',
//   bgSize: '100%',
//   bgPosition: '0% 90%',
// }

/******************** PORTRAIT *********************/

const portrait_zero: HeroBannerConfig = {
  bgPosition: '92.5% -10vw',
  bgSize: '260%',
  textLeft: '25vw',
  textAlign: 'center',
  textContainerTransform: '',
  textTransform: 'skew(-2deg, -2deg) rotate(-2deg)',
  textWidth: '50vw',
  textSize: '6vw',
  textPaddingTop: '80vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '80vw',
};
const portrait_min: HeroBannerConfig = { // 320px
  bgPosition: '87% 0%',
  bgSize: '190%',
  textLeft: '1vw',
  textPaddingTop: '48vw',
  textPaddingBottom: '80vw',
};
const portrait_xs: HeroBannerConfig = { // 440px
  bgPosition: '87% 20%',
  bgSize: '180%',
  textLeft: '5vw',
  textPaddingTop: '50vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '35vw',
};
const portrait_sm: HeroBannerConfig = { // 600px
  bgSize: '165%',
  bgPosition: '85% 0vw',
  textLeft: '11vw',
  textPaddingTop: '45vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '21vw',
};

const portrait_md: HeroBannerConfig = { // 840px
  bgSize: '155%',
  bgPosition: '82% -4vw',
  textLeft: '5vw',
  textPaddingTop: '30vw',
  textPaddingBottom: '27vw'
};

/************* EXPORT ***************/

export const findUsPageHeroBannerConfigs = new Map([
  [Orientations.LANDSCAPE, new Map([
    [BreakpointsEnum.zero, landscape_zero],
    [BreakpointsEnum.sm, landscape_sm],
    [BreakpointsEnum.md, landscape_md],
    [BreakpointsEnum.lg, landscape_lg],
    // [BreakpointsEnum.xl, landscape_xl]
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