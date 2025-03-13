import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// Angular Material
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
// components
import { AddOptionDialogComponent } from '../../../pages/employees/add-option-dialog/add-option-dialog.component';
// services
import { DialogService } from './services/dialog.service';

@Component({
  selector: 'app-dialog',
  imports: [
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],

  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  selectedFiles: { [key: string]: File } = {};

  constructor(
    private dialogService: DialogService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.form = this.dialogService.createForm(
      this.data.fields,
      this.data.values
    );
    if (this.data.mode === 'view') {
      this.form.disable();
    }
  }

  ngOnInit() {
    this.data.fields.forEach((field: any) => {
      if (field.type === 'dropdown') {
        const storedOptions = this.dialogService.getFromLocalStorage(field.key);
        if (storedOptions.length) {
          storedOptions.forEach((option: string) => {
            if (!field.options.includes(option)) {
              field.options.push(option);
            }
          });
        }
      }
    });
  }

  onFileSelected(event: Event, key: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles[key] = input.files[0];
    }
  }

  openAddOptionDialog(field: any) {
    const dialogRef = this.dialog.open(AddOptionDialogComponent, {
      width: '300px',
      data: { label: field.label },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && !field.options.includes(result)) {
        field.options.push(result);
        this.dialogService.addToLocalStorageArray(field.key, result);
      }
    });
  }

  onPreview() {
    if (this.data.values) {
      this.router.navigate(['/employee-details', this.data.values.idNumber]);
      this.dialogRef.close();
    }
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
