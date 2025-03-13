import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private fb: FormBuilder) {}

  // إنشاء FormGroup بناءً على الحقول والقيم
  createForm(fields: any[], values: any = {}): FormGroup {
    const form = this.fb.group({});
    fields.forEach((field) => {
      const value = values[field.key] || '';
      form.addControl(
        field.key,
        this.fb.control(value, field.required ? Validators.required : [])
      );
    });
    return form;
  }

  // استرجاع خيارات القائمة المنسدلة
  getFromLocalStorage(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  }

  // حفظ خيارات القائمة المنسدلة
  saveToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // إضافة عنصر جديد إلى القائمة المنسدلة
  addToLocalStorageArray(key: string, value: any): void {
    const storedItems = this.getFromLocalStorage(key);
    if (!storedItems.includes(value)) {
      storedItems.push(value);
      this.saveToLocalStorage(key, storedItems);
    }
  }
}
