import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {

  emailForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  constructor(private fb: FormBuilder) { }

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
      // organizer: [''],
      // partyDate: [''],
      // startTime: [''],
      // endTime: [''],
      organizer: ['', [Validators.required]],
      partyDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
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
    if (this.emailForm.valid) {
      console.log('submit reservation', this.emailForm.value);
    }
  }
}
