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
  // trigger('routeChangeAnimation', [
  //   transition('* => *', [
  //     query(
  //       ':enter', 
  //       [
  //         animate('0s linear', 
  //           style([{
  //             opacity: 0,
  //             position: 'absolute',
  //             //height: '0px'
  //           }])
  //         )
  //       ],
  //       { optional: true }
  //     ),
  //     query(
  //       ':leave', 
  //       [
  //         style({ 
  //           opacity: 1, 
  //           //height: '300px' 
  //         }),
  //         animate('1s ease-out', 
  //           style([{
  //             opacity: 0,
  //             position: 'absolute',
  //             //height: '0px'
  //           }])
  //         )
  //       ],
  //       { optional: true }
  //     ),
  //     query(
  //       ':enter', [
  //         animate('1s ease-in', 
  //           style([{
  //             opacity: 1,
  //             positon: 'relative',
  //             //height: '100px'
  //           }])
  //         )
  //       ],
  //       { optional: true }
  //     )
  //   ])
  // ]),
  // trigger('footerChangeAnimation', [
  //   transition('* => *', [
  //     animate('1s ease-out',
  //       style({
  //         opacity: 0
  //       })
  //     ),
  //     animate('1s ease-in',
  //       style({
  //         opacity: 1
  //       })
  //     )
  //   ])
  // ]),
  // trigger('slideInOut', [
  //   state('in', style({
  //     overflow: 'hidden',
  //     height: '*',
  //     //width: '300px'
  //   })),
  //   state('out', style({
  //     opacity: '0',
  //     overflow: 'hidden',
  //     height: '0px',
  //     //width: '0px'
  //   })),
  //   transition('in => out', animate('400ms ease-in-out')),
  //   transition('out => in', animate('400ms ease-in-out'))
  // ]),
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
      animate('0.2s ease-in', style({ opacity: 1, zIndex: 3 }))
    ]),
    transition('SHOW => HIDE', [      
      style({ opacity: 1, zIndex: 3 }),
      animate('0.2s ease-in', style({ opacity: 0, zIndex: 3 })), // hide overlay
      animate('0.01s linear', style({ opacity: 0, zIndex: 1 })), // move overlay beneath content
    ]),
    transition('HIDE => SHOW', [
      style({ opacity: 0, zIndex: 1 }),
      animate('0.01s linear', style({ opacity: 0, zIndex: 3 })), // move overlay on top of content
      animate('0.2s ease-in', style({ opacity: 1, zIndex: 3 })), // show overlay
    ])
  ])
];