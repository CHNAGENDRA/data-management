import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-registration-dialog',
  imports: [MatFormField, MatLabel, ReactiveFormsModule, MatDialogActions],
  templateUrl: './registration-dialog.component.html',
  styleUrl: './registration-dialog.component.css'
})
export class RegistrationDialogComponent {

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegistrationDialogComponent>
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['']
    });
  }

  onSave(): void {
    if (this.registrationForm.valid) {
      this.dialogRef.close(this.registrationForm.value); // return form data
    }
  }

  onDelete(): void {
    this.dialogRef.close({ action: 'delete' });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
