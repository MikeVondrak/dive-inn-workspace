import { BreakpointsEnum, Orientations } from "@dive-inn-lib";
import { HeroBannerConfig } from "../../models/hero-banner.model";

/****************** LANDSCAPE *******************/

const landscape_zero: HeroBannerConfig = {
  bgPosition: 'right -10vw',
  bgSize: '175%',
  textLeft: '4vw',
  textTop: '0vw',
  textAlign: 'center',
  textContainerTransform: '',
  textTransform: 'skew(-6deg, -3deg) rotate(-2deg)',
  textWidth: '50vw',
  textSize: '5vw',
  textPaddingTop: '10vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '50vw',
};
const landscape_sm: HeroBannerConfig = { // 600px
  //textPaddingTop: '45vw',
  textPaddingBottom: '45vw',
}
const landscape_md: HeroBannerConfig = { // 840px
  textSize: '4vw',
  textWidth: '40vw',
  bgPosition: 'right -9vw',
  bgSize: '125%',
  //textTop: '-15vw',
  textLeft: '10vw',
  textPaddingTop: '11vw',
  textPaddingBottom: '26vw'
};
const landscape_lg: HeroBannerConfig = { // 1024
  bgSize: '100%',
  bgPosition: 'right -7vw',
  textPaddingTop: '8vw',
  textPaddingBottom: '19vw'
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
  textPaddingTop: '11vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '70vw',
};
const portrait_min: HeroBannerConfig = { // 320px
  bgPosition: '102% -10vw',
  bgSize: '230%',  
  textPaddingTop: '10vw',
  textPaddingBottom: '70vw',
};
const portrait_xs: HeroBannerConfig = { // 440px
  bgPosition: '107% -10vw',
  bgSize: '200%',
  textSize: '6vw',
  textLeft: '20vw',
  textWidth: '60vw',  
  textPaddingTop: '10vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '56vw',
};
const portrait_sm: HeroBannerConfig = { // 600px    
  //bgSize: '200%',
  //bgPosition: '107% -10vw',  
  textSize: '5vw',
  textLeft: '23vw',
  textWidth: '54vw',  
  textPaddingTop: '17vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '54vw',
};

const portrait_md: HeroBannerConfig = { // 840px
  bgSize: '150%',
  bgPosition: '107% -8vw',
  //textTransform: 'skew(-2deg, -2deg) rotate(-2deg)',
  textSize: '3.5vw',
  textLeft: '30vw',
  textWidth: '40vw',
  textPaddingTop: '13vw',
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