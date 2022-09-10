import { BreakpointsEnum, Orientations } from "@dive-inn-lib";
import { HeroBannerConfig } from "../../models/hero-banner.model";

const heroBannerConfig_landscape_zero: HeroBannerConfig = {
  //height: '',
  //width: '',
  bgPosition: '0%, 0%',
  bgSize: 'cover',
  //textTop: '',
  textLeft: '0rem',
  textAlign: 'left',
  textContainerTransform: '',
  textTransform: '',
  textWidth: '',
};
const heroBannerConfig_landscape_md: HeroBannerConfig = {
  //height: '',
  //width: '',
  bgPosition: '100%, 100%',
  bgSize: 'contain',
  //textTop: '',
  //textLeft: '2rem',
  textAlign: 'left',
  textContainerTransform: '',
  textTransform: '',
  textWidth: '',
};


export const homepageHeroBannerConfigs = new Map([
  [Orientations.LANDSCAPE, new Map([
    [BreakpointsEnum.zero, heroBannerConfig_landscape_zero],
    [BreakpointsEnum.md, heroBannerConfig_landscape_md],
  ])
  ],
  [Orientations.PORTRAIT, new Map()],
]);