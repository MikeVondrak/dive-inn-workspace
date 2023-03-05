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

const hideMarkerAnimation = '0.33s linear';
const showMarkerAnimation = '0.5s linear';

export const rentalMapAnimations = [ 
  trigger('basicFadeTransitions', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(showMarkerAnimation, style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(hideMarkerAnimation, style({ opacity: 0 }))
    ]),
  ]),
  trigger('mapMarkerTransitions', [
    state(OpacityAnimationStates.HIDDEN, style({ opacity: 0 })),
    state(OpacityAnimationStates.SHOWING, style({ opacity: 1 })),
    transition(`${OpacityAnimationStates.HIDDEN } <=> ${OpacityAnimationStates.SHOWING}`, [
      animate(showMarkerAnimation)
    ])
  ]),
  trigger('mapTransitions', [
    state(RentalSpaces.DEFAULT, 
      style({ 
        backgroundSize: '100%',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
      })
    ),
    state(RentalSpaces.LEGEND, 
      style({ 
        backgroundSize: '220%',
        backgroundPositionX: 'right',
        backgroundPositionY: 'top',
      })
    ),
    state(RentalSpaces.SPACE1, 
      style({ 
        backgroundSize: '288%',
        backgroundPositionX: '0',
        backgroundPositionY: '22%',
      })
    ),
    state(RentalSpaces.SPACE2, 
      style({ 
        backgroundSize: '320%',
        backgroundPositionX: '37%',
        backgroundPositionY: '68%',
      })
    ),
    transition(`* <=> *`, [
      animate(showMarkerAnimation)
    ])
  ])
];