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
import {
  OpacityAnimationStates,
  RentalSpaces,
} from '../models/rental-map.model';

// https://www.techiediaries.com/angular-router-animations/

const markerAnimation = '0.15s linear';
const mapZoomInAnimation = '0.25s ease-in';
const mapZoomOutAnimation = '0.25s ease-in';
const overlayAnimation = '0.75s ease-in-out';

export const rentalMapAnimations = [
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
  trigger('mapMarkerTransitions', [
    transition('* => *', [
      query(
        ':leave',
        [
          style({ transform: 'translateX(-50%) scale(1)' }),
          stagger(50, [
            animate(
              '0.5s cubic-bezier(0,0.15,0.5,-1)',
              style({ transform: 'translateX(-50%) scale(0)' })
            ),
          ]),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({ transform: 'translateX(-50%) scale(0)' }),
          stagger(20, [
            animate(
              '0.5s cubic-bezier(.15,.96,.59,1.51)',
              style({ transform: 'translateX(-50%) scale(1)' })
            ),
          ]),
        ],
        { optional: true }
      ),
    ]),
    // state(OpacityAnimationStates.HIDDEN, style({ transform: 'translateX(-50%) scale(0)', opacity: 0 })),
    // state(OpacityAnimationStates.SHOWING, style({ transform: 'translateX(-50%) scale(1)', opacity: 1 })),
    // state('void', style({ transform: 'scale(0)', opacity: 0 })),
    // transition(`${OpacityAnimationStates.HIDDEN } <=> ${OpacityAnimationStates.SHOWING}`, [
    //   animate(markerAnimation)
    // ])
  ]),
  trigger('mapTransitions', [
    // state(RentalSpaces.LEGEND,
    //   style({
    //     backgroundSize: '210%',
    //     backgroundPosition: 'right top',
    //     // transform: 'scale(1.25)'
    //   })
    // ),
    // transition(`* <=> *`, [
    // query(':leave', [
    //   style({ transform: 'translateX(-50%) scale(1)' }),
    //   stagger(500, [animate('1.5s ease-in', style({ transform: 'translateX(-50%) scale(0)' }))])
    // ], { optional: true }),
    // query('@*', [
    //   stagger(500, [animateChild()]),
    // ])
    // ]),
    // transition(`* => ${RentalSpaces.DEFAULT}`, [
    //   query('@*', [animateChild()], { optional: true }), // so e.g. buttons will fade in/out
    // ])
  ]),
  trigger('mapOverlayTransitions', [
    state(RentalSpaces.DEFAULT, style({ opacity: 0 })),
    state(RentalSpaces.LEGEND, style({ opacity: 1 })),
    transition(`${RentalSpaces.DEFAULT} => *`, [
      style({ opacity: 0 }),
      animate(mapZoomInAnimation, style({ opacity: 1 })),
    ]),
    transition(`* => ${RentalSpaces.DEFAULT}`, [
      style({ opacity: 1 }),
      animate(mapZoomOutAnimation, style({ opacity: 0 })),
    ]),
  ]),
];
