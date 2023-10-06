import {
  animation,
  style,
  animate,
  trigger,
  transition,
  useAnimation,
  state,
  query,
  stagger,
  group,
  sequence,
  animateChild,
} from '@angular/animations';  

const overlayAnimation = '0.5s ease-in-out';

export const imageListAnimations = [
  trigger('imageListShowHide', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(overlayAnimation, style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(overlayAnimation, style({ opacity: 0 })),
    ]),
    // state('HIDE', style({ opacity: 0 })),
    // state('SHOW', style({ opacity: 1 })),
    // transition(`* => SHOW`, [
    //   style({ opacity: 0 }),
    //   animate('1s ease-in-out', style({ opacity: 1 })),
    // ]),
    // transition(`SHOW => HIDE`, [
    //   style({ opacity: 1 }),
    //   animate('1s ease-in-out', style({ opacity: 0 })),
    // ]),
  ])
];