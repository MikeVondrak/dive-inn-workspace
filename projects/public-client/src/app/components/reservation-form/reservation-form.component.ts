import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { AnimationEvent } from '@angular/animations';
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

  @ViewChild('Top') Top?: ElementRef<HTMLElement>;

  contactType = ContactType;

  emailForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  statusMessage: string = '';

  public formState$: BehaviorSubject<ReservationFormState> = new BehaviorSubject<ReservationFormState>(ReservationFormState.ENTRY);
  public reservationFormState = ReservationFormState;

  private lastPhoneValue: string = '';

  constructor(private reservationService: ReservationApiService, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.createForm();
    this.autoFormatPhoneNumber();
    this.subscribeToCheckbox();
  }
  
  formGet(field: string) { return this.emailForm.get(field); }

  createForm() {
    // BELOW IS ACTUAL FORM
    this.emailForm = this.fb.group({
      partyTheme: [''],
      birthday: [false],
      birthdayName: [{value: '', disabled: true}],
      birthdayAge: [{value: null, disabled: true}],
      endTime: [''],
      organizer: ['', [Validators.required]],
      partyDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      // endTime: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9\(\) -]{14}$')]],
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
      headcount: [null, [Validators.required, Validators.pattern("^[0-9*]*$")]],
      comments: [''],
    });

  }

  public hasErrors(field: AbstractControl<any, any> | null) {
    if (!field) {
      return false;
    }
    if (field.touched || this.submitted) {
      const hasError = field.hasError('email') || field.hasError('required') || field.hasError('pattern');
      return hasError;
    }
    return false;
  }

  public autoFormatPhoneNumber() {
    const input = this.emailForm.get('phone');
    if (!input) {
      return;
    }

    input.valueChanges.subscribe((value: string) => {
      if (value === '') {
        this.lastPhoneValue = '';
        return;
      }      
      const deleting = value.length < this.lastPhoneValue.length;
      console.log('-----', {value}, this.lastPhoneValue, {deleting});
      
      // Remove all non-digit characters from the input
      let cleanValue = value.replace(/\D/g, '');
      // if (cleanValue.length < 1) {
      //   return;
      // }
      
      if (deleting) {
        let lastChar = value[value.length - 1];
        while ((lastChar === '(' || lastChar === ')' || lastChar === '-' || lastChar === ' ') && value.length > 0) {
          value = value.slice(0, value.length - 1);
          lastChar = value[value.length - 1];
        }
        if (value.length > 0) {
          value = value.slice(0, value.length - 1);
        }
        console.log('deleting', {value}, this.lastPhoneValue);
        this.lastPhoneValue = value;
        return;
      }

      let idx = Math.min(cleanValue.length, 3);
      const area = cleanValue.slice(0, idx);
      let first3 = '';
      let last4 = '';
      console.log({cleanValue}, {value}, {idx});
      if (cleanValue.length > 3) {
        first3 = cleanValue.slice(3, Math.min(cleanValue.length, 6));        
      }
      if (cleanValue.length > 6) {
        last4 = cleanValue.slice(6, cleanValue.length);
      }
      const formattedValue = `(${area}) ${first3}-${last4}`;
      input.setValue(formattedValue, { emitEvent: false });
      
    //   if (cleanValue.length > 0) {
    //     formattedValue += '(' + cleanValue[0];
    //   }
    //   if (cleanValue.length > 1) {
    //     formattedValue += cleanValue.slice(0, Math.min(cleanValue.length - 1, 2));
    //   }
    //   if (cleanValue.length < 3) {
    //     input.setValue(formattedValue, { emitEvent: false });
        
    //     console.log('1', {formattedValue});
        
    //     return;
    //   }
    //   formattedValue += ') ';
    //   formattedValue += cleanValue.slice(3, Math.min(cleanValue.length - 1, 3));
    //   if (cleanValue.length < 6) {
    //     input.setValue(formattedValue, { emitEvent: false });
        
    //     console.log('2', {formattedValue});

    //     return;
    //   }
    //   formattedValue += ' - ';
    //   formattedValue += cleanValue.slice(6);
      
    //   console.log('3', {formattedValue});
      
    //   input.setValue(formattedValue, { emitEvent: false });
    });
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
        phoneNumber: this.emailForm.get('phone')?.value
      },
      date: this.emailForm.get('partyDate')?.value,
      startTime: this.emailForm.get('startTime')?.value,
      endTime: this.emailForm.get('endTime')?.value,
      rentalSpaces: spaces,
      notes: this.emailForm.get('comments')?.value,
      
    };

    if (this.emailForm.valid) {
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
          setTimeout(() => {
            if (this.Top?.nativeElement) {
              this.scrollTo(this.Top?.nativeElement);
            }
          }, 2000); // wait for animations to finish and then scroll the error content to the top of the window
      });
    }
  }

  scrollTo(element: HTMLElement) {
    element.scrollIntoView({behavior: 'smooth', block: 'start' });
  }

  public errorCancelClick() {
    setTimeout(() => {
      if (this.Top?.nativeElement) {
        this.scrollTo(this.Top?.nativeElement);
      }
      this.formState$.next(ReservationFormState.ENTRY);
    }, 0);
  }

  public clickEmpty(event: MouseEvent) {
    event.stopPropagation();
  }

  public animationDone(event: AnimationEvent) {

  }
}
