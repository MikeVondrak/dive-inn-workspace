import { BreakpointsEnum, Orientations } from "@dive-inn-lib";
import { HeroBannerConfig } from "../../models/hero-banner.model";

/****************** LANDSCAPE *******************/

const landscape_zero: HeroBannerConfig = {
  bgPosition: '81% -21vw',
  bgSize: '175%',
  textLeft: '0vw',
  textTop: '-10vw',
  textAlign: 'right',
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
  bgPosition: '98.5% -15vw',
  bgSize: '260%',
  textLeft: '15vw',
  textAlign: 'center',
  textContainerTransform: '',
  textTransform: 'skew(-1deg, -1deg) rotate(-1deg)',
  textWidth: '70vw',
  textSize: '7vw',
  textPaddingTop: '24vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '80vw',
};
const portrait_min: HeroBannerConfig = { // 320px
  bgPosition: '102% -10vw',
  bgSize: '230%',  
  textPaddingTop: '20vw',
  textPaddingBottom: '70vw',
};
const portrait_xs: HeroBannerConfig = { // 440px
  bgPosition: '107% -10vw',
  bgSize: '200%',
  textSize: '6vw',
  textLeft: '20vw',
  textWidth: '60vw',  
  textPaddingTop: '18vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '56vw',
};
const portrait_sm: HeroBannerConfig = { // 600px    
  //bgSize: '200%',
  //bgPosition: '107% -10vw',  
  textSize: '5vw',
  textLeft: '23vw',
  textWidth: '54vw',  
  textPaddingTop: '22vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '54vw',
};

const portrait_md: HeroBannerConfig = { // 840px
  bgSize: '150%',
  bgPosition: '107% -6vw',
  //textTransform: 'skew(-2deg, -2deg) rotate(-2deg)',
  textSize: '3.5vw',
  textLeft: '30vw',
  textWidth: '40vw',
  textPaddingTop: '20vw',
  textPaddingBottom: '42vw'
};

/************* EXPORT ***************/

export const privatePartiesPageHeroBannerConfigs = new Map([
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