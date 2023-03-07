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
const overlayAnimation = '0.2s ease-in';

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
        backgroundSize: '240%',
        backgroundPosition: '0 12%',
      })
    ),
    state(RentalSpaces.SPACE2, 
      style({ 
        backgroundSize: '320%',
        backgroundPosition: '37% 62.75%',
      })
    ),
    state(RentalSpaces.SPACE3, 
      style({ 
        backgroundSize: '220%',
        backgroundPosition: '62% 53%',
      })
    ),
    state(RentalSpaces.SPACE4, 
      style({ 
        backgroundSize: '270%',
        backgroundPosition: '36% 100%',
      })
    ),
    state(RentalSpaces.SPACE5, 
      style({ 
        backgroundSize: '180%',
        backgroundPosition: '100% 100%',
      })
    ),
    state(RentalSpaces.SPACE6, 
      style({ 
        backgroundSize: '250%',
        backgroundPosition: '92% 58%',
      })
    ),
    state(RentalSpaces.SPACE7, 
      style({ 
        backgroundSize: '105%',
        backgroundPosition: '0% 0%',
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