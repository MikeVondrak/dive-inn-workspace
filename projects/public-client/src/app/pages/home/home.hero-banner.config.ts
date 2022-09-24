import { BreakpointsEnum, Orientations } from "@dive-inn-lib";
import { HeroBannerConfig } from "../../models/hero-banner.model";

/************* LANDSCAPE **************/
const heroBannerConfig_landscape_zero: HeroBannerConfig = {
  bgPosition: '60% 25%',
  bgSize: '150%',
  textTop: '0',
  textLeft: '0',
  textAlign: 'right',
  textContainerTransform: '',
  textTransform: 'skew(350deg, 346deg) rotate(0)',
  textWidth: '50vw',
  textSize: '5vw',
  textPaddingTop: '17vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '15vw',
};
const heroBannerConfig_landscape_md: HeroBannerConfig = {
  //height: '',
  //width: '',
  bgPosition: '90% 50%',
  bgSize: '110%',
  textTop: '0.5vw',
  //textLeft: '3vw',
  //textAlign: 'left',
  //textContainerTransform: '',
  //textTransform: '',
  //textWidth: '',
  textSize: '3.5vw',
  textPaddingTop: '17vw',
  textPaddingBottom: '35vw',
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
  bgPosition: '90% 50%',
  bgSize: '110%',
  textTop: '0.5vw',
  textWidth: '50vw',
  textSize: '3.5vw',
  textPaddingTop: '17vw',
  textPaddingBottom: '35vw',
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