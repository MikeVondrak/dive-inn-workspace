import { Component, Input, HostBinding, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnInit {
  @Input() cubeSize: number = 30;
  @Input() faceLabels: string[] = ['A', 'B', 'C', 'D', 'E'];//, 'E-', 'F-', 'G-', 'H-'];
  
  @HostBinding('style.--rotation') rotation: string = 'rotateY(0deg)';
  @HostBinding('style.--transform1') transform1: string = `translate3d(${-1.207 * this.cubeSize + 'vw'}, 0, 0) rotateY(-90deg)`;
  
  public faces: Subject<string>[] = [];
  public positions = [0, 1, 2, 3, 4, 5, 6, 7];
  public currentFace: number = 0;
  public currentPosition: number = 0;
  public currentRotation = 0;

  private numberOfPositions = this.positions.length;
  private numberOfFaceLabels = this.faceLabels.length;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // create a subject for each face of the octagon to be able to change content when rotated
    this.faces = this.positions.map(() => new Subject<string>());
    this.initializeFaces();
    this.setFacesContent(0);
    //this.setPreviousNextFacesContent(0);
  }

  public rotateLeft() {    
    this.currentPosition = ++this.currentPosition >= this.numberOfPositions ? 0 : this.currentPosition;
    this.currentFace = ++this.currentFace < this.numberOfFaceLabels ? this.currentFace : 0;
    this.currentRotation = this.currentRotation -= 45;
    //this.currentRotation = this.currentRotation < -90 ? -90 : this.currentRotation; // prevent rotation past
    this.updateRotation();
    console.log('ROTATE LEFT');
  }

  public rotateRight() {
    this.currentPosition = --this.currentPosition < 0 ? this.numberOfPositions - 1 : this.currentPosition;
    this.currentFace = --this.currentFace < 0 ? this.numberOfFaceLabels - 1 : this.currentFace;
    this.currentRotation += 45;
    this.updateRotation();
    console.log('ROTATE RIGHT');
  }

  private updateRotation() {
    this.rotation = `rotateY(${this.currentRotation}deg)`;
    //this.setFacesContent(this.currentFace);
    console.log(`updateRotation curPos: ${this.currentPosition}`);
    this.setPreviousNextFacesContent(this.currentPosition);
  }

  private initializeFaces() {
    // for now there must be at least enough faces to 
    // if (this.faceLabels.length < 3) {
    //   console.error('Not enough face labels: ', this.faceLabels.length);
    //   return;
    // }
    // if there are fewer faces with content than the number of visible faces, duplicate the face content
    // if (this.faceLabels.length < this.visibleFaces.length) {
    //   let lastCopiedIndex = 0;
    //   this.faceLabels = this.visibleFaces.map((f, i) => {
    //     // if a label doesn't exist for this face, copy an existing face
    //     if (!this.faceLabels[i]) {
    //       const newVal = this.faceLabels[lastCopiedIndex];
    //       lastCopiedIndex++;
    //       return newVal;
    //     }
    //     return this.faceLabels[i];
    //   });
    // }
    console.log('face labels: ', this.faceLabels);
    this.cdr.detectChanges();
  }

  private setPreviousNextFacesContent(position: number) {
    console.log(`setPrevousNextFacesContent: ${position}`);
    let idx = position;
    const faceLabelsLength = this.faceLabels.length;
    const numberOfPositionsLength = this.numberOfPositions;
    let nextLeftFace = this.currentFace - 2;
    let nextRightFace = this.currentFace + 2;

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

    let leftPosition =  idx - 2 >= 0 ? idx - 2 : idx - 2 + (numberOfPositionsLength);
    let rightPosition =  idx + 2 < numberOfPositionsLength ? idx + 2 : (idx - numberOfPositionsLength) + 2;
    console.log(`currentFace: ${this.currentFace}, position: ${position}, lf: ${nextLeftFace}, rf: ${nextRightFace}, leftFace: ${this.faceLabels[nextLeftFace]} rightFace: ${this.faceLabels[nextRightFace]}, leftPosition: ${leftPosition}, rightPosition: ${rightPosition}, faceLabels: ${this.faceLabels}, faces: ${this.faces.length}`);
    this.faces[leftPosition].next(this.faceLabels[nextLeftFace]);    
    this.faces[rightPosition].next(this.faceLabels[nextRightFace]);

    this.cdr.detectChanges();
  }

  private setFacesContent(i: number) {
    console.log(`setFaces: ${i}`);
    let idx = i;

    // while (idx < this.faceLabels.length) {
    //   this.faces[idx].next(this.faceLabels[idx]);
    //   console.log(`faces: ${this.faceLabels[idx]}`)
      
    //   idx++;
    //   console.log(`idx ${idx}`);
    // }

    // set center face
    this.faces[0].next(this.faceLabels[idx]);
    idx = this.getNextFaceLabelIndex(idx);
    // set right faces
    this.faces[1].next(this.faceLabels[idx]);
    idx = this.getNextFaceLabelIndex(idx);
    this.faces[2].next(this.faceLabels[idx]);
    
    // set left faces
    idx = this.faceLabels.length - 2;
    this.faces[6].next(this.faceLabels[idx]);
    idx = this.getNextFaceLabelIndex(idx);
    this.faces[7].next(this.faceLabels[idx]);
    
    

    this.cdr.detectChanges();
  }

  private getNextFaceLabelIndex(i: number) {
    let idx =  (i + 1) >= this.faceLabels.length ? 0 : i + 1;
    console.log(`i: ${i}, idx: ${idx}`);
    return idx;
  }
}
