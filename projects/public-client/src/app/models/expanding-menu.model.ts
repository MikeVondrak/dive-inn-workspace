// export interface ExpandingMenuLink<ExpandingMenuHeaderType> {
//   header: ExpandingMenuHeaderType;
//   uiLabel: string;
//   linkUrl: string;
//   fragment: string;
// }



export interface ExpandingMenuLink {
  uiLabel: string;
  linkUrl: string;
  fragment: string;
}

export interface ExpandingMenuLinkGroup {
  title: string;
  links: ExpandingMenuLink[];
}