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

const overlayAnimation = '0.75s ease-in-out';

export const imageListAnimations = [
  trigger('overlayTransitions', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(overlayAnimation, style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(overlayAnimation, style({ opacity: 0 })),
    ]),
  ]),
];