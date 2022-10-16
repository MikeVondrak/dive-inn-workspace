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
  textPaddingTop: '45vh', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '45vh',
};
const heroBannerConfig_landscape_md: HeroBannerConfig = {
  //height: '',
  //width: '',
  bgPosition: '50% 50%',
  bgSize: '100%',
  textTop: '-15vw',
  textLeft: '56vw',
  textAlign: 'left',
  textPaddingBottom: '20vh'
};

const heroBannerConfig_landscape_xl: HeroBannerConfig = {
  textPaddingBottom: '20vw'
}

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
  textPaddingTop: '40vh',
  textPaddingBottom: '20vw'
};

export const foodpageHeroBannerConfigs = new Map([
  [Orientations.LANDSCAPE, new Map([
    [BreakpointsEnum.zero, heroBannerConfig_landscape_zero],
    [BreakpointsEnum.md, heroBannerConfig_landscape_md],
    [BreakpointsEnum.xl, heroBannerConfig_landscape_xl]
  ])
  ],
  [Orientations.PORTRAIT, new Map([
    [BreakpointsEnum.zero, heroBannerConfig_portrait_zero],
    [BreakpointsEnum.sm, heroBannerConfig_portrait_sm],
    [BreakpointsEnum.md, heroBannerConfig_portrait_md],
  ])],
]);