import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

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
  })
];
const horizontalUnflipKeyframes = [
  style({
    offset: 0,
    transform: 'scale(1) rotateY(180deg)',
  }),
  style({
    offset: 0.5,
    transform: 'scale(1.75) rotateY(90deg)',
  }),
  style({
    offset: 1,
    transform: 'scale(1) rotateY(0deg)',
  }),
];
const verticalFlipKeyframes = [
  style({
    offset: 0,
    transform: 'scale(1) rotateX(0deg)',
    boxShadow: '1px 1px 4px 0px black'
  }),
  style({
    offset: 0.5,
    transform: 'scale(1.1) rotateX(90deg)',
    boxShadow: '0px 0px 0px 0px black'
  }),
  style({
    offset: 1,
    transform: 'scale(1) rotateX(180deg)',
    boxShadow: '-1px -1px 4px 0px black'
  })
];
const verticalUnflipKeyframes = [
  style({
    offset: 0,
    transform: 'scale(1) rotateX(180deg)',
    boxShadow: '-1px -1px 4px 0px black'
  }),
  style({
    offset: 0.5,
    transform: 'scale(1.1) rotateX(90deg)',
    boxShadow: '0px 0px 0px 0px black'
  }),
  style({
    offset: 1,
    transform: 'scale(1) rotateX(0deg)',
    boxShadow: '1px 1px 4px 0px black'
  }),
];

export const CardFlipAnimationHorizontal = [
    trigger('cardFlipTransition', [
      state('faceDown', style({ transform: 'rotateY(180deg)' })),
      state('faceUp', style({ transform: 'rotateY(0deg)' })),
      transition('faceDown => faceUp', animate('0.6s ease', keyframes(horizontalUnflipKeyframes))),
      transition('faceUp => faceDown', animate('0.6s ease', keyframes(horizontalFlipKeyframes))),
    ]),
]

export const CardFlipAnimationVertical = [
  
    trigger('cardFlipTransition', [
      state('faceDown', style({ transform: 'rotateX(180deg)', boxShadow: '-1px -1px 4px 0px black' })),
      state('faceUp', style({ transform: 'rotateX(0deg)'})), //boxShadow: '1px 1px 4px 0px black' })),
      transition('faceDown => faceUp', animate('0.6s ease', keyframes(verticalUnflipKeyframes))),
      transition('faceUp => faceDown', animate('0.6s ease', keyframes(verticalFlipKeyframes))),
    ]),
]