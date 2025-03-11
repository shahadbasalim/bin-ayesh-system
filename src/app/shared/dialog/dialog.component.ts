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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private router: Router
  ) {
    // هنا ماعبيته لان الحقول بتجيني من مكونات المستخدمين والموظفين
    this.form = this.fb.group({});
    this.data.fields.forEach((field: any) => {
      // جلب القيم القديمة في حال توفرها اذا فكيت على وضع التعديل من مكون الموظفين
      const value = this.data.values ? this.data.values[field.key] || '' : '';

      this.form.addControl(
        field.key,
        this.fb.control(value, field.required ? Validators.required : [])
      );
    });
    // إذا كان الوضع view، نقوم بتعطيل كافة الحقول
    if (this.data.mode === 'view') {
      this.form.disable();
    }
  }

  // options on dropdown menu
  ngOnInit() {
    this.data.fields.forEach((field: any) => {
      const value = this.data.values ? this.data.values[field.key] || '' : '';
      this.form.addControl(
        field.key,
        this.fb.control(value, field.required ? Validators.required : [])
      );

      if (field.type === 'dropdown') {
        const storedOptions = JSON.parse(
          localStorage.getItem(field.key) || '[]'
        );
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

  selectedFiles: { [key: string]: File } = {};

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
      if (result) {
        // التحقق من وجود الخيار الجديد في القائمة
        const isOptionExists = field.options.includes(result);

        if (!isOptionExists) {
          field.options.push(result);

          // تحديث القيم في LocalStorage
          let storedOptions = JSON.parse(
            localStorage.getItem(field.key) || '[]'
          );
          if (!storedOptions.includes(result)) {
            storedOptions.push(result);
            localStorage.setItem(field.key, JSON.stringify(storedOptions));
          }
        }
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
