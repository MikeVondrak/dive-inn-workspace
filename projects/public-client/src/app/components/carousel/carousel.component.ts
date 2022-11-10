import { Component, Input, HostBinding, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnInit {
  @Input() cubeSizeVw: number = 30;
  @Input() faceLabels: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

  @HostBinding('style.--rotation') rotation: string = 'rotateY(0deg)';
  //@HostBinding('style.--transformW') transformW: string = `translate3d(${-1.207 * this.cubeSizeVw + 'vw'}, 0, 0) rotateY(-90deg)`;

  public leftGradient: boolean[] = this.faceLabels.map(() => false);
  public rightGradient: boolean[] = this.faceLabels.map(() => false);

  public faces: Subject<string>[] = [];
  public readonly positions = [0, 1, 2, 3, 4, 5, 6, 7]; // currently only handling octagon
  public currentFace: number = 0;
  public currentPosition: number = 0;
  public currentRotation = 0;

  private numberOfPositions = this.positions.length;
  private numberOfFaceLabels = this.faceLabels.length;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // create a subject for each face of the octagon to be able to change content when rotated
    this.faces = this.positions.map(() => new Subject<string>());

    if (this.numberOfFaceLabels <= 0) {
      console.error('Carousel initialized with no face labels');
      return;
    }
    // NOTE: necessary to detect changes prior to initializeFacesContent for proper initialization of carousel, 
    // - does not have initial values shown w/o doing this
    this.cdr.detectChanges();

    // NOTE: be sure to have called detectChanges() prior to calling this, otherwise the function needs a setTimeout
    this.initializeFacesContent();
  }

  public rotateLeft() {    
    this.currentPosition = ++this.currentPosition >= this.numberOfPositions ? 0 : this.currentPosition;
    this.currentFace = ++this.currentFace < this.numberOfFaceLabels ? this.currentFace : 0;
    this.currentRotation = this.currentRotation -= 45;
    //this.currentRotation = this.currentRotation < -90 ? -90 : this.currentRotation; // prevent rotation past
    this.updateRotation();    
  }

  public rotateRight() {
    this.currentPosition = --this.currentPosition < 0 ? this.numberOfPositions - 1 : this.currentPosition;
    this.currentFace = --this.currentFace < 0 ? this.numberOfFaceLabels - 1 : this.currentFace;
    this.currentRotation += 45;
    this.updateRotation();
  }

  private updateRotation() {
    this.rotation = `rotateY(${this.currentRotation}deg)`;
    this.setPreviousNextFacesContent(this.currentPosition);
  }

  private setPreviousNextFacesContent(position: number) {
    let idx = position;
    const faceLabelsLength = this.faceLabels.length;
    const numberOfPositionsLength = this.numberOfPositions;
    let nextLeftFace = this.currentFace - 2;
    let nextRightFace = this.currentFace + 2;
    let leftCardIdx = (this.currentPosition - 1) < 0 ? numberOfPositionsLength - 1 : this.currentPosition - 1;
    let rightCardIdx = (this.currentPosition + 1) > numberOfPositionsLength - 1 ? 0 : this.currentPosition + 1;

    if (nextLeftFace < 0) {
      // if the index goes below 0 reset to end of array
      nextLeftFace += faceLabelsLength;
    } else if (nextLeftFace >= faceLabelsLength) {
      // if the index goes above number of face labels reset to start of array
      nextLeftFace -= faceLabelsLength;
    }
    if (nextRightFace < 0) {
      nextRightFace += faceLabelsLength;
    } else if (nextRightFace >= faceLabelsLength) {
      nextRightFace -= faceLabelsLength;
    }

    let nextLeftPosition =  idx - 2 >= 0 ? idx - 2 : idx - 2 + (numberOfPositionsLength);
    let nextRightPosition =  idx + 2 < numberOfPositionsLength ? idx + 2 : (idx - numberOfPositionsLength) + 2;
    //console.log(`currentFace: ${this.currentFace}, position: ${position}, lf: ${nextLeftFace}, rf: ${nextRightFace}, leftFace: ${this.faceLabels[nextLeftFace]} rightFace: ${this.faceLabels[nextRightFace]}, leftPosition: ${leftPosition}, rightPosition: ${rightPosition}, faceLabels: ${this.faceLabels}, faces: ${this.faces.length}`);
    this.faces[nextLeftPosition].next(this.faceLabels[nextLeftFace]);    
    this.faces[nextRightPosition].next(this.faceLabels[nextRightFace]);

    this.leftGradient = this.leftGradient.map(g => false);
    this.rightGradient = this.rightGradient.map(g => false);
    this.leftGradient[leftCardIdx] = true;
    this.rightGradient[rightCardIdx] = true;

    this.cdr.detectChanges();
  }

  // NOTE: currently assumes 8 faces
  private initializeFacesContent() {
    let idx = 0;
    // set center face
    let label = this.faceLabels[idx];
    this.faces[0].next(label);    
    idx = this.getNextFaceLabelIndex(idx);
    // set right faces
    this.faces[1].next(this.faceLabels[idx]);
    idx = this.getNextFaceLabelIndex(idx);
    this.faces[2].next(this.faceLabels[idx]);
    // set left faces
    idx = this.faceLabels.length - 2 >= 0 ? this.faceLabels.length - 2 : 0;
    this.faces[6].next(this.faceLabels[idx]);
    idx = this.getNextFaceLabelIndex(idx);
    this.faces[7].next(this.faceLabels[idx]);
    
    this.leftGradient = this.leftGradient.map(g => false);
    this.rightGradient = this.rightGradient.map(g => false);
    this.leftGradient[7] = true;
    this.rightGradient[1] = true;
  }

  private getNextFaceLabelIndex(i: number) {
    let idx = (i + 1) >= this.numberOfFaceLabels ? 0 : i + 1;    
    return idx;
  }
}
