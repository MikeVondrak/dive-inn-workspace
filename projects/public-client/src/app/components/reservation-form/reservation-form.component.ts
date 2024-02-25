import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { AnimationEvent } from '@angular/animations';
import { Observable, BehaviorSubject, Subject, take, takeUntil } from 'rxjs';
import { RentalSpaces, Reservation, ContactType } from '../../models/api/reservations.api.model';
import { ReservationApiService } from '../../services/reservation.api.service';
import { animations } from '../../animations/reservation-form.animations';
import copy from '../../../../../../utility/copy/dive-inn-copy.module';

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
export class ReservationFormComponent implements OnInit, OnDestroy {

  @ViewChild('Top') Top?: ElementRef<HTMLElement>;

  contactType = ContactType;

  emailForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  statusMessage: string = '';
  showInfo: boolean = false;

  public copyEmail = copy;

  public formState$: BehaviorSubject<ReservationFormState> = new BehaviorSubject<ReservationFormState>(ReservationFormState.ENTRY);
  public reservationFormState = ReservationFormState;

  private lastPhoneValue: string = '';

  private destroy$ = new Subject<void>();

  constructor(private reservationService: ReservationApiService, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.createForm();
    this.autoFormatPhoneNumber();
    this.subscribeToCheckbox();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      phone: ['', [Validators.required, Validators.pattern('^[0-9\(\) -]{14}$')]],
      email: ['', [Validators.required, Validators.email]],
      contactMethod: [this.contactType.EMAIL],
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

    input.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: string) => {
      if (!value || value === '') {
        this.lastPhoneValue = '';
        return;
      }
      let backspace = value.length < this.lastPhoneValue.length;
      let newVal = value.replace(/\D/g, '');
      if (backspace && newVal.length <= 6) {
        newVal = newVal.substring(0, newVal.length - 1);
      }
      if (newVal.length === 0) {
        newVal = '';
      } else if (newVal.length <= 3) {
        newVal = newVal.replace(/^(\d{0,3})/, '($1)');
      } else if (newVal.length <= 6) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
      } else if (newVal.length <= 10) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
      } else {
        newVal = newVal.substring(0, 10);
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
      }
      input.setValue(newVal, { emitEvent: false });
      this.lastPhoneValue = newVal;
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
    const orgName = this.emailForm.get('organizer')?.value;
    const forceFail = orgName === 'TestTheFormFailingOrganizer';

    this.submitted = true;

    const startTime = this.formatTime(this.emailForm.get('startTime')?.value);
    const endTime = this.formatTime(this.emailForm.get('endTime')?.value);
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
      startTime: startTime,
      endTime: endTime,
      notes: this.emailForm.get('comments')?.value,
      
    };

    if (this.emailForm.valid) {
      this.formState$.next(ReservationFormState.SUBMITING)
      this.statusMessage = 'Submitting';
      this.reservationService.submitReservation(formModel).pipe(take(1)).subscribe(
        response => {
          if (forceFail) {
            throw new Error('Subit failure forced');
          }
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

  public infoClicked(action: string) {
    // if (action === 'open') {
    //   this.formState$.next(this.reservationFormState.INFO);
    // } else if (action === 'close') {
    //   this.formState$.next(this.reservationFormState.ENTRY);
    // }
    // setTimeout(() => {
    //   if (this.Top?.nativeElement) {
    //     this.scrollTo(this.Top?.nativeElement);
    //   }
    // }, 2000); // wait for animations to finish and then scroll the error content to the top of the window
    this.showInfo = !this.showInfo;
  }

  public animationDone(event: AnimationEvent) {
  }

  public formatTime(timeString: string | null): string {
    if (!timeString) {
      return '';
    }
    const timeStrings = timeString?.split(':');
    const date = new Date();
    date.setHours(+timeStrings?.[0] || 0);
    date.setMinutes(+timeStrings?.[1] || 0);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Denver' }) || '';
  }
}
