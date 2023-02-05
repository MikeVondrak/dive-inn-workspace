import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { RentalSpaces, Reservation, ContactType } from '../../models/api/reservations.api.model';
import { ReservationApiService } from '../../services/reservation.api.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {

  emailForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  constructor(private reservationService: ReservationApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.subscribeToCheckbox();
  }

  createForm() {
    this.emailForm = this.fb.group({
      partyTheme: [''],
      birthday: [false],
      birthdayName: [{value: '', disabled: true}],
      birthdayAge: [{value: null, disabled: true}],
      organizer: [''],
      partyDate: [''],
      startTime: [''],
      endTime: [''],
      // organizer: ['', [Validators.required]],
      // partyDate: ['', [Validators.required]],
      // startTime: ['', [Validators.required]],
      // endTime: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      contactMethod: [null],
      preferredSpaceNone: [false],
      preferredSpaceMainRoom: [false],
      preferredSpacePartyBoat: [false],
      preferredSpaceNorthPatio: [false],
      preferredSpaceNorthRoom: [false],
      preferredSpaceGameRoom: [false],
      preferredSpaceSouthRoom: [false],
      preferredSpaceSouthPatio: [false],
      headcount: [null, Validators.required],
      comments: [''],
    })
  }

  subscribeToCheckbox() {
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

  sendEmail() {
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
      rentalSpaces: spaces,
      notes: this.emailForm.get('comments')?.value,
      
    };
    if (this.emailForm.valid) {
      console.log('submit res', this.emailForm.value, formModel);
      const sub = this.reservationService.submitReservation(formModel);
      sub.subscribe();
      this.emailForm.reset();
      this.submitted = false;
    }
  }
}
