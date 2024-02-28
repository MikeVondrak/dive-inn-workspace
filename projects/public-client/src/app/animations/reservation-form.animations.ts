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
  keyframes,
} from '@angular/animations';
import {
  OpacityAnimationStates,
  RentalSpaces,
} from '../models/rental-map.model';


const overlayAnimation = '0.5s ease-in-out';


export const animations = [
  trigger('fadeScaletransitions', [  
    transition(':enter', [
      style({ opacity: 0, scale: 0.175, height: 0, }),
      animate(overlayAnimation, style({ opacity: 1, scale: 1, height: '*' })),
    ]),
    transition(':leave', [
      style({ opacity: 1, scale: 1, height: '*' }),
      animate(overlayAnimation, style({ opacity: 0, scale: 0.175, height: 0 })),
    ]),
  ]),
  trigger('fadeScaletransitionsParent', [
    transition('* => *', [
      sequence([
        query(':leave, :enter', [style({ opacity: 0, overflow: 'hidden', height: 0 })]),
        query(
          ':leave',
          [
            style({ height: '*', opacity: 1 }),
            animate(overlayAnimation, style({ height: 0, opacity: 0 })),
          ],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate(overlayAnimation, style({ height: '*', opacity: 1 })),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ]),
];
