import { BreakpointsEnum, Orientations } from "@dive-inn-lib";
import { HeroBannerConfig } from "../../models/hero-banner.model";

const heroBannerConfig_landscape_zero: HeroBannerConfig = {
  bgPosition: '60% 25%',
  bgSize: '150%',
  textLeft: '0rem',
  textAlign: 'right',
  textContainerTransform: '',
  textTransform: 'skew(350deg, 346deg) rotate(0)',
  textWidth: '50vw',
  textSize: '6vw',
  textPaddingTop: '15vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '15vw',
};
const heroBannerConfig_landscape_md: HeroBannerConfig = {
  //height: '',
  //width: '',
  bgPosition: '100% 100%',
  bgSize: '150%',
  //textTop: '',
  //textLeft: '2rem',
  textAlign: 'left',
  textContainerTransform: '',
  textTransform: '',
  textWidth: '',
};


export const foodpageHeroBannerConfigs = new Map([
  [Orientations.LANDSCAPE, new Map([
    [BreakpointsEnum.zero, heroBannerConfig_landscape_zero],
    [BreakpointsEnum.md, heroBannerConfig_landscape_md],
  ])
  ],
  [Orientations.PORTRAIT, new Map()],
]);