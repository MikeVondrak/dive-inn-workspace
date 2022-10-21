import { BreakpointsEnum, Orientations } from "@dive-inn-lib";
import { HeroBannerConfig } from "../../models/hero-banner.model";

const heroBannerConfig_landscape_zero: HeroBannerConfig = {
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
const heroBannerConfig_landscape_md: HeroBannerConfig = {
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
const heroBannerConfig_landscape_lg: HeroBannerConfig = {
  textPaddingBottom: '20vw'
}
const heroBannerConfig_landscape_xl: HeroBannerConfig = {
  textPaddingBottom: '20vw'
}

const heroBannerConfig_portrait_zero: HeroBannerConfig = {
  bgPosition: '60% 18%',
  bgSize: '400%',
  textLeft: '0rem',
  textAlign: 'right',
  textContainerTransform: '',
  textTransform: 'skew(350deg, 346deg) rotate(0)',
  textWidth: '50vw',
  textSize: '6vw',
  textPaddingTop: '100vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '100vw',
};
const heroBannerConfig_portrait_min: HeroBannerConfig = { // 320px
  bgPosition: '62%, 18%',
  bgSize: '360%',
  textPaddingTop: '90vw',
  textPaddingBottom: '90vw',
};
const heroBannerConfig_portrait_xs: HeroBannerConfig = { // 440px
  bgPosition: '63%, 18%',
  bgSize: '320%',
  textPaddingTop: '65vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '90vw',
};
const heroBannerConfig_portrait_sm: HeroBannerConfig = { // 600px
  bgSize: '280%',
  bgPosition: '50% 32%',
  textPaddingTop: '40vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '60vw',
};

const heroBannerConfig_portrait_md: HeroBannerConfig = { // 840px
  bgSize: '220%',
  bgPosition: '69% 24%',
  textPaddingTop: '40vw',
  textPaddingBottom: '50vw'
};

export const eventsPageHeroBannerConfigs = new Map([
  [Orientations.LANDSCAPE, new Map([
    [BreakpointsEnum.zero, heroBannerConfig_landscape_zero],
    [BreakpointsEnum.md, heroBannerConfig_landscape_md],
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