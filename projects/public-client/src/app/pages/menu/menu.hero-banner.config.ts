import { BreakpointsEnum, Orientations } from "@dive-inn-lib";
import { HeroBannerConfig } from "../../models/hero-banner.model";

const heroBannerConfig_landscape_zero: HeroBannerConfig = {
  bgPosition: '60% 25%',
  bgSize: '100%',
  textLeft: '0rem',
  textAlign: 'right',
  textContainerTransform: '',
  textTransform: 'skew(350deg, 346deg) rotate(0)',
  textWidth: '50vw',
  textSize: '6vw',
  textPaddingTop: '45vh', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '45vh',
};
const heroBannerConfig_landscape_md: HeroBannerConfig = {
  //height: '',
  //width: '',
  bgPosition: '50% 50%',
  bgSize: '100%',
  //textTop: '',
  //textLeft: '2rem',
  textAlign: 'left',
  textContainerTransform: '',
  textTransform: '',
  textWidth: '',
};

const heroBannerConfig_portrait_zero: HeroBannerConfig = {
  bgPosition: '60% 50%',
  bgSize: '200%',
  textLeft: '0rem',
  textAlign: 'right',
  textContainerTransform: '',
  textTransform: 'skew(350deg, 346deg) rotate(0)',
  textWidth: '50vw',
  textSize: '6vw',
  textPaddingTop: '33vh', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '33vh',
};

const heroBannerConfig_portrait_sm: HeroBannerConfig = {
  textPaddingTop: '40vh', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '40vh',
};

const heroBannerConfig_portrait_md: HeroBannerConfig = {
  bgSize: '150%',
};

export const foodpageHeroBannerConfigs = new Map([
  [Orientations.LANDSCAPE, new Map([
    [BreakpointsEnum.zero, heroBannerConfig_landscape_zero],
    [BreakpointsEnum.md, heroBannerConfig_landscape_md],
  ])
  ],
  [Orientations.PORTRAIT, new Map([
    [BreakpointsEnum.zero, heroBannerConfig_portrait_zero],
    [BreakpointsEnum.sm, heroBannerConfig_portrait_sm],
    [BreakpointsEnum.md, heroBannerConfig_portrait_md],
  ])],
]);