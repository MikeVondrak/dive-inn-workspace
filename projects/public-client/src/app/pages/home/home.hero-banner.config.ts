import { BreakpointsEnum, Orientations } from "@dive-inn-lib";
import { HeroBannerConfig } from "../../models/hero-banner.model";

/************* LANDSCAPE **************/
const heroBannerConfig_landscape_zero: HeroBannerConfig = {
  bgPosition: '60% 45%',
  bgSize: '150%',
  textTop: '0',
  textLeft: '0',
  textAlign: 'right',
  textContainerTransform: '',
  textTransform: 'skew(350deg, 346deg) rotate(0)',
  textWidth: '50vw',
  textSize: '5vw',
  textPaddingTop: '15vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '38vw',
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
  bgPosition: '69% 32%',
  bgSize: '350%',
  textTop: '0',
  textLeft: '-4vw',
  textAlign: 'right',
  textContainerTransform: '', 
  textTransform: 'skew(-11deg, -10deg) rotate(0)',
  textWidth: '80vw',
  textSize: '7vw',
  textPaddingTop: '69vw', // NOTE: using this for vertical spacing of bg instead of height on container
  textPaddingBottom: '45vw',
};
const heroBannerConfig_portrait_md: HeroBannerConfig = {
  bgPosition: '90% 50%',
  bgSize: '110%',
  textTop: '1vw',
  textLeft: '0vw',
  textWidth: '50vw',
  textSize: '3.5vw',
  textPaddingTop: '16vw',
  textPaddingBottom: '35vw',
  textTransform: 'skew(350deg, 346deg) rotate(0)',
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