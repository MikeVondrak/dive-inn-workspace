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

const markerAnimation = '0.15s linear';
const mapZoomInAnimation = '0.25s ease-out';
const mapZoomOutAnimation = '0.25s ease-out';
const overlayAnimation = '0.75s ease-in';

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
    state(OpacityAnimationStates.HIDDEN, style({ transform: 'translateX(-50%) scale(0)', opacity: 0 })),
    state(OpacityAnimationStates.SHOWING, style({ transform: 'translateX(-50%) scale(1)', opacity: 1 })),
    state('void', style({ transform: 'scale(0)', opacity: 0 })),
    transition(`${OpacityAnimationStates.HIDDEN } <=> ${OpacityAnimationStates.SHOWING}`, [
      animate(markerAnimation)
    ])
  ]),
  trigger('mapTransitions', [    
    // state(RentalSpaces.DEFAULT, 
    //   style({ 
    //     backgroundSize: '100%',
    //     backgroundPosition: 'center',
    //   })
    // ),
    // state(RentalSpaces.LEGEND, 
    //   style({ 
    //     //backgroundSize: '210%',
    //     backgroundPosition: 'right top',
    //     //transform: 'scale(1.25)'
    //   })
    // ),
    // state(RentalSpaces.SPACE1, 
    //   style({ 
    //     //backgroundSize: '240%',
    //     backgroundPosition: '0 12%',
    //     //transform: 'scale(1.25)'
    //   })
    // ),
    // state(RentalSpaces.SPACE2, 
    //   style({ 
    //     //backgroundSize: '320%',
    //     backgroundPosition: '37% 62.75%',
    //     //transform: 'scale(1.25)'
    //   })
    // ),
    // state(RentalSpaces.SPACE3, 
    //   style({ 
    //     //backgroundSize: '160%',
    //     backgroundPosition: '91% 31.5%',
    //     //transform: 'scale(1.25)'
    //   })
    // ),
    // state(RentalSpaces.SPACE4, 
    //   style({ 
    //     backgroundSize: '220%',
    //     backgroundPosition: '26% 100%',
    //   })
    // ),
    // state(RentalSpaces.SPACE5, 
    //   style({ 
    //     backgroundSize: '180%',
    //     backgroundPosition: '100% 100%',
    //   })
    // ),
    // state(RentalSpaces.SPACE6, 
    //   style({ 
    //     backgroundSize: '230%',
    //     backgroundPosition: '91% 61.5%',
    //   })
    // ),
    // state(RentalSpaces.SPACE7, 
    //   style({ 
    //     backgroundSize: '105%',
    //     backgroundPosition: '0% 0%',
    //   })
    // ),

    transition(`${RentalSpaces.DEFAULT} => *`, [
      query('@*', [animateChild()], { optional: true }), // so e.g. buttons will fade in/out
    ]),
    transition(`* => ${RentalSpaces.DEFAULT}`, [
      query('@*', [animateChild()], { optional: true }), // so e.g. buttons will fade in/out
    ])
  ]),
  trigger('mapOverlayTransitions', [    
     state(RentalSpaces.DEFAULT, style({ opacity: 0 })),
     state(RentalSpaces.LEGEND, style({ opacity: 1 })),
     transition(`${RentalSpaces.DEFAULT} => *`, [      
      style({ opacity: 0 }),
      animate(mapZoomInAnimation, style({ opacity: 1 }),),
    ]),
    transition(`* => ${RentalSpaces.DEFAULT}`, [
      style({ opacity: 1 }),
      animate(mapZoomOutAnimation, style({ opacity: 0 })),
    ])
  ])
];