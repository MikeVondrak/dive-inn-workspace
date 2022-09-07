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

export const routeAnimations = [ 
  trigger('viewportAnimation', [
    state('HIDE', style({
      opacity: 0,
    })),
    state('SHOW', style({
      opacity: 1,
    })),
    transition('void => HIDE', [
      style({ opacity: 0, zIndex: 1})
    ]),
    transition('void => SHOW', [
      style({ opacity: 0, zIndex: 3}),
      animate('0.2s linear', style({ opacity: 1, zIndex: 3 }))
    ]),
    transition('SHOW => HIDE', [      
      style({ opacity: 1, zIndex: 3 }),
      animate('0.2s linear', style({ opacity: 0, zIndex: 3 })), // hide overlay
      animate('0.01s linear', style({ opacity: 0, zIndex: 1 })), // move overlay beneath content
    ]),
    transition('HIDE => SHOW', [
      style({ opacity: 0, zIndex: 1 }),
      animate('0.01s linear', style({ opacity: 0, zIndex: 3 })), // move overlay on top of content
      animate('0.2s linear', style({ opacity: 1, zIndex: 3 })), // show overlay
    ])
  ])
];