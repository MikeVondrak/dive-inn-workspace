export enum ExpandingMenuStateEnum {
  CLOSED,
  OPEN,
}
export interface ExpandingMenuLink {
  uiLabel: string;
  linkUrl: string;
  fragment: string;
  active: boolean;
}

export interface ExpandingMenuLinkGroup {
  title: string;
  links: ExpandingMenuLink[];
}
