import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { Observable, BehaviorSubject, Subject, take } from 'rxjs';
import { RentalSpaces, Reservation, ContactType } from '../../models/api/reservations.api.model';
import { ReservationApiService } from '../../services/reservation.api.service';
import { animations } from '../../animations/reservation-form.animations';

enum ReservationFormState {
  ENTRY,
  SUBMITING,
  SUCCESS,
  ERROR,
}

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
  animations: [animations],
})
export class ReservationFormComponent implements OnInit {

  contactType = ContactType;

  emailForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  statusMessage: string = '';

  public formState$: BehaviorSubject<ReservationFormState> = new BehaviorSubject<ReservationFormState>(ReservationFormState.ENTRY);
  public reservationFormState = ReservationFormState;

  constructor(private reservationService: ReservationApiService, private fb: FormBuilder) { }

  // get organizer() { return this.emailForm.get('organizer'); }
  // get email() { return this.emailForm.get('email'); }
  // get email() { return this.emailForm.get('email'); }
  // get email() { return this.emailForm.get('email'); }
  // get email() { return this.emailForm.get('email'); }
  
  ngOnInit(): void {
    this.createForm();
    this.subscribeToCheckbox();
  }
  
  formGet(field: string) { return this.emailForm.get(field); }

  createForm() {
    // BELOW IS ACTUAL FORM
    // this.emailForm = this.fb.group({
    //   partyTheme: [''],
    //   birthday: [false],
    //   birthdayName: [{value: '', disabled: true}],
    //   birthdayAge: [{value: null, disabled: true}],
    //   // organizer: ['test name'],
    //   // partyDate: ['10/10/2010'],
    //   // startTime: ['10am'],
    //   endTime: [''],
    //   organizer: ['', [Validators.required]],
    //   partyDate: ['', [Validators.required]],
    //   startTime: ['', [Validators.required]],
    //   // endTime: ['', [Validators.required]],
    //   phone: ['', [Validators.required]],
    //   // phone: ['234-234-2343'],
    //   // email: ['adsf@asfd.com'],
    //   // email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
    //   email: ['', [Validators.required, Validators.email]],
    //   contactMethod: [this.contactType.EMAIL],
    //   preferredSpaceNone: [false],
    //   preferredSpaceMainRoom: [false],
    //   preferredSpacePartyBoat: [false],
    //   preferredSpaceNorthPatio: [false],
    //   preferredSpaceNorthRoom: [false],
    //   preferredSpaceGameRoom: [false],
    //   preferredSpaceSouthRoom: [false],
    //   preferredSpaceSouthPatio: [false],
    //   headcount: [null, [Validators.required]],//, Validators.pattern("^[0-9*]*$")]],
    //   comments: [''],
    // });

    // BELOW IS FOR TESTING
    this.emailForm = this.fb.group({
      partyTheme: [''],
      birthday: [false],
      birthdayName: [{value: '', disabled: true}],
      birthdayAge: [{value: null, disabled: true}],
      // organizer: ['test name'],
      // partyDate: ['10/10/2010'],
      // startTime: ['10am'],
      endTime: [''],
      organizer: ['', []],
      partyDate: ['', []],
      startTime: ['', []],
      // endTime: ['', [Validators.required]],
      phone: ['', []],
      // phone: ['234-234-2343'],
      // email: ['adsf@asfd.com'],
      // email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      email: ['', [Validators.required, Validators.email]],
      contactMethod: [this.contactType.EMAIL],
      preferredSpaceNone: [false],
      preferredSpaceMainRoom: [false],
      preferredSpacePartyBoat: [false],
      preferredSpaceNorthPatio: [false],
      preferredSpaceNorthRoom: [false],
      preferredSpaceGameRoom: [false],
      preferredSpaceSouthRoom: [false],
      preferredSpaceSouthPatio: [false],
      headcount: [null, []],//, Validators.pattern("^[0-9*]*$")]],
      comments: [''],
    })
  }

  hasErrors(field: AbstractControl<any, any> | null) {
    if (!field) {
      return false;
    }
    if (field.touched || this.submitted) {
      if (field.hasError('email')) {
        return true;
      }
      return field.hasError('required');
    }
    return false;
  }

  public errorCheck(field: AbstractControl<any, any> | null, pattern?: boolean) {
    if (!field) {
      return false;
    }
    if (field.touched) {
      if (pattern && field.hasError('email')) {
        return true;
      }
      return field.hasError('required');
    }
    return false;
  }

  public subscribeToCheckbox() {
    this.emailForm.get('birthday')?.valueChanges.subscribe(value => {
      if (value) {
        this.emailForm.get('birthdayName')?.enable();
        this.emailForm.get('birthdayAge')?.enable();
      } else {
        this.emailForm.get('birthdayName')?.disable();
        this.emailForm.get('birthdayAge')?.disable();
        this.emailForm.get('birthdayName')?.setValue(null);
        this.emailForm.get('birthdayAge')?.setValue(null);
      }
    })
  }

  public sendEmail() {
    console.log('SEND EMAIL', this.emailForm.valid);

    this.submitted = true;
    let spaces: RentalSpaces[] = [];
    if (this.emailForm.get('preferredSpaceNone')?.value) {
      spaces.push(RentalSpaces.NO_PREFERENCE);
    };
    if (this.emailForm.get('preferredSpaceGameRoom')?.value) {
      spaces.push(RentalSpaces.GAME_ROOM); 
    }
    if (this.emailForm.get('preferredSpaceMainRoom')?.value) {
      spaces.push(RentalSpaces.MAIN_ROOM);
    }
    if (this.emailForm.get('preferredSpaceNorthPatio')?.value) {
      spaces.push(RentalSpaces.NORTH_PATIO);
    }
    if (this.emailForm.get('preferredSpaceNorthRoom')?.value) {
      spaces.push(RentalSpaces.NORTH_ROOM);
    }
    if (this.emailForm.get('preferredSpacePartyBoat')?.value) {
      spaces.push(RentalSpaces.PARTY_BOAT);
    }
    if (this.emailForm.get('preferredSpaceSouthRoom')?.value) { 
      spaces.push(RentalSpaces.SOUTH_ROOM);
    }
    if (this.emailForm.get('preferredSpaceSouthPatio')?.value) { 
      spaces.push(RentalSpaces.SOUTH_PATIO) 
    };
    let formModel: Reservation = {
      headcount: this.emailForm.get('headcount')?.value,
      theme: this.emailForm.get('partyTheme')?.value,
      birthday: {
        name: this.emailForm.get('birthdayName')?.value,
        age: this.emailForm.get('birthdayAge')?.value,
      },
      organizer: {
        name: this.emailForm.get('organizer')?.value,
        preferredContact: this.emailForm.get('contactMethod')?.value,
        email: this.emailForm.get('email')?.value,
        voice: this.emailForm.get('phone')?.value
      },
      date: this.emailForm.get('partyDate')?.value,
      startTime: this.emailForm.get('startTime')?.value,
      endTime: this.emailForm.get('endTime')?.value,
      rentalSpaces: spaces,
      notes: this.emailForm.get('comments')?.value,
      
    };

    if (this.emailForm.valid) {
      console.log('SENDING EMAIL', formModel);
      this.formState$.next(ReservationFormState.SUBMITING)
      this.statusMessage = 'Submitting';
      this.reservationService.submitReservation(formModel).pipe(take(1)).subscribe(
        response => {
          if (response.success) {
            this.formState$.next(ReservationFormState.SUCCESS);
            this.statusMessage = 'Successfully submitted';
            this.emailForm.reset();
          } 
          this.submitted = false;      
        },
        error => {
          this.formState$.next(ReservationFormState.ERROR);
          this.statusMessage = '';
          console.error('Error sending reservation request', error.status);
      });
    }
  }

  scrollTo(element: HTMLElement) {
    element.scrollIntoView({behavior: 'smooth'});
  }
}
