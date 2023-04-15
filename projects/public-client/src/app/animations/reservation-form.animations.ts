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

// https://www.techiediaries.com/angular-router-animations/

const markerAnimation = '0.15s linear';
const mapZoomInAnimation = '0.25s ease-in';
const mapZoomOutAnimation = '0.25s ease-in';
const overlayAnimation = '0.5s ease-in-out';

const horizontalFlipKeyframes = [
  style({
    offset: 0,
    transform: 'scale(1) rotateY(0deg)',
  }),
  style({
    offset: 0.5,
    transform: 'scale(1.75) rotateY(90deg)',
  }),
  style({
    offset: 1,
    transform: 'scale(1) rotateY(180deg)',
  }),
];

export const animations = [
  // trigger('fadeScaletransitions', [
  //   //transition(':enter', [
  //   transition('void => *', [
  //     style({ opacity: 0, scale: 0.75 }),
  //     animate(overlayAnimation, style({ opacity: 1, scale: 1 })),
  //   ]),
  //   transition('* => void', [
  //     style({ opacity: 1, scale: 1 }),
  //     animate(overlayAnimation, style({ opacity: 0, scale: 0.75 })),
  //   ]),
  // ]),
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
