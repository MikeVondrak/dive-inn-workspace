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
const showOverlayAnimation = '0.33s 1s linear';
const hideButtonAnimation = '0.2s linear';
const showButtonAnimation = '0.33s 1s linear';
const zoomMapInAnimation = '1.0s ease-in-out';
const zoomMapOutAnimation = '1.0s ease-in-out';

export const rentalMapAnimations = [ 
  // trigger('lateFade', [
  //   transition(':enter', [
  //     style({ opacity: 0, zIndex: 1}),
  //     animate(`${showOverlayAnimation}`, style({ opacity: 1, zIndex: 3 }))
  //   ]),
  //   transition(':leave', [
  //     style({ opacity: 1, zIndex: 3}),
  //     animate(`${hideOverlayAnimation}`, style({ opacity: 0, zIndex: 3 }))
  //   ]),
    
  // ]),
  // trigger('buttonFade', [  
  //   transition(':enter', [
  //     style({ opacity: 0, zIndex: 1}),
  //     animate(`${showButtonAnimation}`, style({ opacity: 1, zIndex: 3 }))
  //   ]),
  //   transition(':leave', [
  //     style({ opacity: 1, zIndex: 3}),
  //     animate(`${hideButtonAnimation}`, style({ opacity: 0, zIndex: 3 }))
  //   ]),
  // ]),
  trigger('lateFade', [
    state('unfaded', style({ opacity: 1 })),
    state('faded', style({ opacity: 0 })),
    transition('unfaded <=> faded', [
      animate(`${zoomMapInAnimation}`)
    ]),
  ]),
  trigger('buttonFade', [  
    state('unfaded', style({ opacity: 1 })),
    state('faded', style({ opacity: 0 })),
    transition('unfaded <=> faded', [
      animate(`${zoomMapInAnimation}`)
    ]),
  ]),
  trigger('mapZoom', [
    state('unzoomed', style({ backgroundPosition: 'center', backgroundSize: '100%'})),
    state('zoomed', style({ backgroundPosition: 'top left', backgroundSize: 'cover'})),
    transition('unzoomed <=> zoomed', [
      animate(`${zoomMapInAnimation}`)
    ]),
  ]),
];