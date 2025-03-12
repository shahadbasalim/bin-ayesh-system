import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private logsSubject = new BehaviorSubject<any[]>(this.getLogs());
  // جعل BehaviorSubject قابل للاشتراك فيه
  logs$ = this.logsSubject.asObservable();

  getLogs(): any[] {
    return JSON.parse(localStorage.getItem('logs') || '[]');
  }

  // لاضافة عملية جديدة
  addLog(operation: string, page: string) {
    // استرجاع العمليات الحالية
    const logs = this.getLogs();
    const lastId = logs.length > 0 ? logs[logs.length - 1].id : 0; // نحدد اخر اي دي موجود عندنا
    const newId = lastId + 1; // نسوي اي دي جديد للعملية الجديدة الي بتنضاف

     // استرجاع بيانات المستخدم الحالي
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userName = loggedInUser?.name || 'غير مسجل';
    const userId = loggedInUser?.id || 'غير معرف';

    const logEntry = {
      id: newId,
      operation,
      page,
      date: new Date().toLocaleString(),
      user: userName, // إضافة اسم المستخدم
      userId, // إضافة معرف المستخدم
    };

    logs.push(logEntry);
    localStorage.setItem('logs', JSON.stringify(logs));

    // لتحديث قائمة الجدول على الفور
    this.logsSubject.next(logs);
  }
}
