import { BreakpointsEnum, Orientations } from "@dive-inn-lib";
import { HeroBannerConfig } from "../../models/hero-banner.model";

/********** LANDSCAPE **********/
const heroBannerConfig_landscape_zero: HeroBannerConfig = {
  bgPosition: '50% bottom',
  bgSize: '150%',
  textLeft: '0rem',
  textAlign: 'right',
  textContainerTransform: '',
  textTransform: 'skew(12deg, 6deg) rotate(12deg)',
  textWidth: '5vw',
  textSize: '6vw',
  textPaddingTop: '40vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '40vw',
};
const heroBannerConfig_landscape_md: HeroBannerConfig = {
  //height: '',
  //width: '',
  // bgPosition: '50% 50%',
  // bgSize: '100%',
  // textTop: '-15vw',
  // textLeft: '56vw',
  // textAlign: 'left',
  //textPaddingTop: '30vw',
  //textPaddingBottom: '30vw'
};
const heroBannerConfig_landscape_lg: HeroBannerConfig = {
  textPaddingBottom: '32vw'
}
const heroBannerConfig_landscape_xl: HeroBannerConfig = {
  textPaddingBottom: '30vw'
}


/********** PORTRAIT **********/
const heroBannerConfig_portrait_zero: HeroBannerConfig = {
  bgPosition: 'center bottom',
  bgSize: '200%',
  textLeft: '0rem',
  textAlign: 'right',
  textContainerTransform: '',
  textTransform: 'skew(350deg, 346deg) rotate(0)',
  textWidth: '50vw',
  textSize: '6vw',
  textPaddingTop: '70vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '40vw',
};
const heroBannerConfig_portrait_min: HeroBannerConfig = {
  //bgSize: '160%',
  // textPaddingTop: '70vw',
  // textPaddingBottom: '80vw',
};
const heroBannerConfig_portrait_xs: HeroBannerConfig = {
  //bgSize: '220%',
  // textPaddingTop: '65vw', // NOTE: using this for vertical spacing of bg instead of height on container
  // textPaddingBottom: '70vw',
};
const heroBannerConfig_portrait_sm: HeroBannerConfig = {
  bgSize: '175%',
  textPaddingTop: '50vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '40vw',
};

const heroBannerConfig_portrait_md: HeroBannerConfig = {
  bgSize: '175%',
  textPaddingTop: '40vw',
  textPaddingBottom: '50vw'
};

export const cluckHeroBannerConfigs = new Map([
  [Orientations.LANDSCAPE, new Map([
    [BreakpointsEnum.zero, heroBannerConfig_landscape_zero],
    [BreakpointsEnum.md, heroBannerConfig_landscape_md],
    [BreakpointsEnum.lg, heroBannerConfig_landscape_lg],
    [BreakpointsEnum.xl, heroBannerConfig_landscape_xl]
  ])
  ],
  [Orientations.PORTRAIT, new Map([
    [BreakpointsEnum.zero, heroBannerConfig_portrait_zero],
    [BreakpointsEnum.min, heroBannerConfig_portrait_min],
    [BreakpointsEnum.xs, heroBannerConfig_portrait_xs],
    [BreakpointsEnum.sm, heroBannerConfig_portrait_sm],
    [BreakpointsEnum.md, heroBannerConfig_portrait_md],
  ])],
]);