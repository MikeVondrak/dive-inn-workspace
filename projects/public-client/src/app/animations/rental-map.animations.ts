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

// https://www.techiediaries.com/angular-router-animations/

const hideOverlayAnimation = '0.33s linear';
const showOverlayAnimation = '0.33s linear';

export const rentalMapAnimations = [ 
  trigger('spaceMarkerTransitions', [
    state('HIDE', style({
      opacity: 0,
    })),
    state('SHOW', style({
      opacity: 1,
    })),
    transition(':enter', [
      style({ opacity: 0 }),
      animate('0.5s 1s ease', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('0.25s ease', style({ opacity: 0 }))
    ]),
  ])
];