import { BreakpointsEnum, Orientations } from "@dive-inn-lib";
import { HeroBannerConfig } from "../../models/hero-banner.model";

/************* LANDSCAPE **************/
const heroBannerConfig_landscape_zero: HeroBannerConfig = {
  bgPosition: '60% 25%',
  bgSize: '150%',
  textTop: '0',
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
  bgSize: 'contain',
  //textTop: '',
  //textLeft: '2rem',
  textAlign: 'left',
  textContainerTransform: '',
  textTransform: '',
  textWidth: '',
};

/************ PORTRAIT ***************/
const heroBannerConfig_portrait_zero: HeroBannerConfig = {
  bgPosition: '69% 27%',
  bgSize: '350%',
  textTop: '0',
  textLeft: '0',
  textAlign: 'right',
  textContainerTransform: '',
  textTransform: 'skew(350deg, 346deg) rotate(0)',
  textWidth: '80vw',
  textSize: '8vw',
  textPaddingTop: '69vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '15vw',
};
const heroBannerConfig_portrait_md: HeroBannerConfig = {
  //height: '',
  //width: '',
  bgPosition: '100% 100%',
  bgSize: 'contain',
  //textTop: '',
  //textLeft: '2rem',
  textAlign: 'left',
  textContainerTransform: '',
  textTransform: '',
  textWidth: '',
};


/*************** EXPORT ***************/
export const homepageHeroBannerConfigs = new Map([
  [Orientations.LANDSCAPE, new Map([
    [BreakpointsEnum.zero, heroBannerConfig_landscape_zero],
    [BreakpointsEnum.md, heroBannerConfig_landscape_md],
  ])
  ],
  [Orientations.PORTRAIT, new Map([
    [BreakpointsEnum.zero, heroBannerConfig_portrait_zero],
    [BreakpointsEnum.md, heroBannerConfig_portrait_md],
  ])
  ],
]);