import { Component, Input, HostBinding, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { CarouselPaneGradientTypes, CarouselPaneFaceDirections } from '../../models/carousel.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnInit {
  @Input() cubeSizeVw: number = 30;
  @Input() faceLabels: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
  @Input() faceContents: TemplateRef<any>[] = []; // <any> is for template context class

  @HostBinding('style.--rotation') rotation: string = 'rotateY(0deg)';
  //@HostBinding('style.--transformW') transformW: string = `translate3d(${-1.207 * this.cubeSizeVw + 'vw'}, 0, 0) rotateY(-90deg)`;

  public readonly positions = [0, 1, 2, 3, 4, 5, 6, 7]; // currently only handling octagon
  public readonly faceDirections = [CarouselPaneFaceDirections.S, CarouselPaneFaceDirections.SE, CarouselPaneFaceDirections.E, CarouselPaneFaceDirections.NE, CarouselPaneFaceDirections.N, CarouselPaneFaceDirections.NW, CarouselPaneFaceDirections.W, CarouselPaneFaceDirections.SW];
  public faces$: Subject<string>[] = [];
  public templates$: Subject<TemplateRef<any>>[] = [];
  public currentFace: number = 0;
  public currentPosition: number = 0;
  public currentRotation = 0;
  public leftGradient: boolean[] = this.positions.map(() => false);
  public rightGradient: boolean[] = this.positions.map(() => false);
  public gradients: CarouselPaneGradientTypes[] = this.positions.map((val, idx) => {
    if (this.leftGradient[idx]) {
      return CarouselPaneGradientTypes.LEFT;
    } else if (this.rightGradient[idx]) {
      return CarouselPaneGradientTypes.RIGHT;
    }
    return CarouselPaneGradientTypes.NONE;
  });
  
  public debugging = true;
  
  private numberOfPositions = this.positions.length;
  private numberOfFaceLabels = 0;
  private numberOfFaceContents = 0;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.numberOfFaceContents = this.faceContents.length;
    this.numberOfFaceLabels = this.faceLabels.length;

    // create a subject for each face of the octagon to be able to change content when rotated
    this.faces$ = this.positions.map(() => new Subject<string>());
    this.templates$ = this.positions.map(() => new Subject<TemplateRef<any>>());

    if ((this.debugging && this.numberOfFaceLabels <= 0) || ( !this.debugging && this.numberOfFaceContents <= 0)) {
      console.error(`Carousel initialized with no face content, ${this.numberOfFaceContents}, ${this.numberOfFaceLabels}`);
      return;
    }
    // NOTE: necessary to detect changes prior to initializeFacesContent for proper initialization of carousel, 
    // - does not have initial values shown w/o doing this
    // - TODO: try BehaviorSubject for panes$ to solve this?
    this.cdr.detectChanges();

    // NOTE: be sure to have called detectChanges() prior to calling this, otherwise the function needs a setTimeout
    if (this.debugging) {
      this.initializeFacesLabels();
    } else {
      this.initializeFacesContent();
    }
  }

  public onSwipe($event: any, loc?: string) {
    console.log('SWIPE!', loc, $event);

    if ($event.direction === 2) {
      this.rotateLeft();
    } else if ($event.direction === 4) {
      this.rotateRight();
    }

  }

  public rotateLeft() {
    const numberOfFaces = this.debugging ? this.numberOfFaceLabels : this.numberOfFaceContents;
    this.currentPosition = ++this.currentPosition >= this.numberOfPositions ? 0 : this.currentPosition;
    this.currentFace = ++this.currentFace < numberOfFaces ? this.currentFace : 0;
    this.currentRotation = this.currentRotation -= 45;
    //this.currentRotation = this.currentRotation < -90 ? -90 : this.currentRotation; // prevent rotation past
    this.updateRotation();    
  }

  public rotateRight() {
    const numberOfFaces = this.debugging ? this.numberOfFaceLabels : this.numberOfFaceContents;
    this.currentPosition = --this.currentPosition < 0 ? this.numberOfPositions - 1 : this.currentPosition;
    this.currentFace = --this.currentFace < 0 ? numberOfFaces - 1 : this.currentFace;
    this.currentRotation += 45;
    this.updateRotation();
  }

  private updateRotation() {
    this.rotation = `rotateY(${this.currentRotation}deg)`;
    this.setPreviousNextFacesContent(this.currentPosition);
  }

  private setPreviousNextFacesContent(position: number) {
    let leftCardIdx = (this.currentPosition - 1) < 0 ? this.numberOfPositions - 1 : this.currentPosition - 1;
    let rightCardIdx = (this.currentPosition + 1) > this.numberOfPositions - 1 ? 0 : this.currentPosition + 1;
    let facesLength = this.debugging ? this.faceLabels.length : this.faceContents.length;
    let nextLeftFace = this.currentFace - 2;
    let nextRightFace = this.currentFace + 2;

    if (nextLeftFace < 0) {
      // if the index goes below 0 reset to end of array
      nextLeftFace += facesLength;
    } else if (nextLeftFace >= facesLength) {
      // if the index goes above number of face labels reset to start of array
      nextLeftFace -= facesLength;
    }
    if (nextRightFace < 0) {
      nextRightFace += facesLength;
    } else if (nextRightFace >= facesLength) {
      nextRightFace -= facesLength;
    }

    // wrap position if below zero or above last index
    let nextLeftPosition =  position - 2 >= 0 ? position - 2 : position - 2 + (this.numberOfPositions);
    let nextRightPosition =  position + 2 < this.numberOfPositions ? position + 2 : (position - this.numberOfPositions) + 2;
    
    //console.log(`currentFace: ${this.currentFace}, position: ${position}, lf: ${nextLeftFace}, rf: ${nextRightFace}, leftFace: ${this.faceLabels[nextLeftFace]} rightFace: ${this.faceLabels[nextRightFace]}, faceLabels: ${this.faceLabels}, faces: ${this.faces$.length}`);
    
    if (this.debugging) {
      this.faces$[nextLeftPosition].next(this.faceLabels[nextLeftFace]);    
      this.faces$[nextRightPosition].next(this.faceLabels[nextRightFace]);
    } else {
      this.templates$[nextLeftPosition].next(this.faceContents[nextLeftFace]);
      this.templates$[nextRightPosition].next(this.faceContents[nextRightFace]);
    }

    this.leftGradient = this.leftGradient.map(g => false);
    this.rightGradient = this.rightGradient.map(g => false);
    this.leftGradient[leftCardIdx] = true;
    this.rightGradient[rightCardIdx] = true;

    this.gradients = this.gradients.map(g => CarouselPaneGradientTypes.NONE);
    this.gradients[leftCardIdx] = CarouselPaneGradientTypes.LEFT;
    this.gradients[nextLeftPosition] = CarouselPaneGradientTypes.LEFT;
    this.gradients[rightCardIdx] = CarouselPaneGradientTypes.RIGHT;
    this.gradients[nextRightPosition] = CarouselPaneGradientTypes.RIGHT;


    this.cdr.detectChanges();
  }

  /**
   * Initializes the inital 3 visible and the previous/next content panes
   * NOTE: currently assumes 8 face "slots", i.e. an octagon
   */
  private initializeFacesContent() {
    let idx = 0;
    
    // set center face
    this.templates$[0].next(this.faceContents[idx]);
    
    // set right faces
    idx = this.getNextIndex(this.faceContents, idx);
    this.templates$[1].next(this.faceContents[idx]);
    idx = this.getNextIndex(this.faceContents, idx);
    this.templates$[2].next(this.faceContents[idx]);

    // set left faces
    idx = this.faceContents.length - 2 >= 0 ? this.faceContents.length - 2 : 0; // get 2nd-to-last index
    this.templates$[6].next(this.faceContents[idx]);
    idx = this.getNextIndex(this.faceContents, idx);
    this.templates$[7].next(this.faceContents[idx]);
    
      this.initializeSideFadeGradients();
  }

  /**
   * Initialize debugging labels for faces
   * NOTE: currently assumes 8 faces (octagon)
   */
  private initializeFacesLabels() {
    let idx = 0;
    
    // set center face
    this.faces$[0].next(this.faceLabels[idx]);
    idx = this.getNextFaceLabelIndex(idx);
    
    // set right faces
    this.faces$[1].next(this.faceLabels[idx]);
    idx = this.getNextFaceLabelIndex(idx);
    this.faces$[2].next(this.faceLabels[idx]);
    
    // set left faces
    idx = this.faceLabels.length - 2 >= 0 ? this.faceLabels.length - 2 : 0;
    this.faces$[6].next(this.faceLabels[idx]);
    idx = this.getNextFaceLabelIndex(idx);
    this.faces$[7].next(this.faceLabels[idx]);
    
    this.initializeSideFadeGradients();
  }

  private initializeSideFadeGradients() {
    this.leftGradient = this.leftGradient.map(g => false);
    this.rightGradient = this.rightGradient.map(g => false);
    this.leftGradient[7] = true;
    this.rightGradient[1] = true;

    this.gradients = this.gradients.map(g => CarouselPaneGradientTypes.NONE);
    this.gradients[7] = CarouselPaneGradientTypes.LEFT;
    this.gradients[1] = CarouselPaneGradientTypes.RIGHT;
  }

  private getNextFaceLabelIndex(i: number) {
    let idx = (i + 1) >= this.numberOfFaceLabels ? 0 : i + 1;    
    return idx;
  }

  private getNextIndex(arr: any[], i: number, offset: number = 1) {
    let idx = (i + offset) >= arr.length ? 0 : (i + offset);    
    return idx;
  }
}
