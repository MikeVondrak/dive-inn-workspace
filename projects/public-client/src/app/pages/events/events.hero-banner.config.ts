import { BreakpointsEnum, Orientations } from "@dive-inn-lib";
import { HeroBannerConfig } from "../../models/hero-banner.model";

/****************** LANDSCAPE *******************/

const landscape_zero: HeroBannerConfig = {
  bgPosition: '60% 25%',
  bgSize: '100%',
  textLeft: '0rem',
  textAlign: 'right',
  textContainerTransform: '',
  textTransform: 'skew(12deg, 6deg) rotate(12deg)',
  textWidth: '5vw',
  textSize: '6vw',
  textPaddingTop: '45vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '45vw',
};
const landscape_md: HeroBannerConfig = {
  //height: '',
  //width: '',
  bgPosition: '50% 50%',
  bgSize: '100%',
  textTop: '-15vw',
  textLeft: '56vw',
  textAlign: 'left',
  textPaddingTop: '30vw',
  textPaddingBottom: '30vw'
};
const landscape_lg: HeroBannerConfig = {
  textPaddingBottom: '20vw'
}
const landscape_xl: HeroBannerConfig = {
  textPaddingBottom: '20vw'
}

/******************** PORTRAIT *********************/

const portrait_zero: HeroBannerConfig = {
  bgPosition: '60% 18%',
  bgSize: '400%',
  textLeft: '25vw',
  textAlign: 'center',
  textContainerTransform: '',
  textTransform: 'skew(-12deg, -6deg) rotate(0)',
  textWidth: '50vw',
  textSize: '6vw',
  textPaddingTop: '90vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '90vw',
};
const portrait_min: HeroBannerConfig = { // 320px
  bgPosition: '62%, 18%',
  bgSize: '360%',
  textPaddingTop: '90vw',
  textPaddingBottom: '90vw',
};
const portrait_xs: HeroBannerConfig = { // 440px
  bgPosition: '63%, 18%',
  bgSize: '320%',
  textPaddingTop: '65vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '70vw',
};
const portrait_sm: HeroBannerConfig = { // 600px
  bgSize: '280%',
  bgPosition: '65% 32%',
  textPaddingTop: '30vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '40vw',
};

const portrait_md: HeroBannerConfig = { // 840px
  bgSize: '220%',
  bgPosition: '69% 24%',
  textPaddingTop: '20vw',
  textPaddingBottom: '25vw'
};

/************* EXPORT ***************/

export const eventsPageHeroBannerConfigs = new Map([
  [Orientations.LANDSCAPE, new Map([
    [BreakpointsEnum.zero, landscape_zero],
    [BreakpointsEnum.md, landscape_md],
    [BreakpointsEnum.lg, landscape_lg],
    [BreakpointsEnum.xl, landscape_xl]
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