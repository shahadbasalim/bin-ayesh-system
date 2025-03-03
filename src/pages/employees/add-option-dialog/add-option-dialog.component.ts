import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-option-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './add-option-dialog.component.html',
  styleUrl: './add-option-dialog.component.css',
})
export class AddOptionDialogComponent {
  optionControl = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<AddOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { label: string }
  ) {}

  save() {
    if (this.optionControl.valid) {
      this.dialogRef.close(this.optionControl.value);
      
    }
  }
}
