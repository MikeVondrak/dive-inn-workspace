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
import { OpacityAnimationStates, RentalSpaces } from '../models/rental-map.model';

// https://www.techiediaries.com/angular-router-animations/

const markerAnimation = '0.2s linear';
const mapZoomInAnimation = '0.75s ease-in-out';
const mapZoomOutAnimation = '0.5s ease-out';
const overlayAnimation = '0.5s ease-in';

export const rentalMapAnimations = [ 
  trigger('overlayTransitions', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(overlayAnimation, style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(overlayAnimation, style({ opacity: 0 }))
    ]),
  ]),
  trigger('mapMarkerTransitions', [
    state(OpacityAnimationStates.HIDDEN, style({ opacity: 0 })),
    state(OpacityAnimationStates.SHOWING, style({ opacity: 1 })),
    transition(`${OpacityAnimationStates.HIDDEN } <=> ${OpacityAnimationStates.SHOWING}`, [
      animate(markerAnimation)
    ])
  ]),
  trigger('mapTransitions', [    
    state(RentalSpaces.DEFAULT, 
      style({ 
        backgroundSize: '100%',
        backgroundPosition: 'center',
      })
    ),
    state(RentalSpaces.LEGEND, 
      style({ 
        backgroundSize: '220%',
        backgroundPosition: 'right top',
      })
    ),
    state(RentalSpaces.SPACE1, 
      style({ 
        backgroundSize: '288%',
        backgroundPosition: '0 21.5%',
      })
    ),
    state(RentalSpaces.SPACE2, 
      style({ 
        backgroundSize: '320%',
        backgroundPosition: '37% 68%',
      })
    ),
    transition(`${RentalSpaces.DEFAULT} => *`, [
      query('@*', [animateChild()], { optional: true }), // so e.g. buttons will fade in/out
      animate(mapZoomInAnimation),
    ]),
    transition(`* => ${RentalSpaces.DEFAULT}`, [
      query('@*', [animateChild()], { optional: true }), // so e.g. buttons will fade in/out
      animate(mapZoomOutAnimation),
    ])
  ])
];