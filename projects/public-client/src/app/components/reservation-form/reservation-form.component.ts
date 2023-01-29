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
  }

  createForm() {
    this.emailForm = this.fb.group({
      partyTheme: [''],
      birthdayName: new FormControl(''),
      birthdayAge: new FormControl(''),
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
      contactMethod: [''],
      preferredSpace: [''],
      headcount: ['', Validators.required],
      comments: [''],
    })
  }

  get form(): { [key: string]: AbstractControl} {
    return this.emailForm.controls;
  }

  sendEmail() {
    this.submitted = true;
    if (this.emailForm.valid) {
      console.log('submit reservation', this.emailForm.value);
    }
  }
}
