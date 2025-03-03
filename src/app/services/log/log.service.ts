import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private logsSubject = new BehaviorSubject<any[]>(this.getLogs());
  logs$ = this.logsSubject.asObservable();

  constructor() {}

  getLogs(): any[] {
    return JSON.parse(localStorage.getItem('logs') || '[]');
  }

  addLog(operation: string, page: string) {
    const logs = this.getLogs();
    const lastId = logs.length > 0 ? logs[logs.length - 1].id : 0;
    const newId = lastId + 1;

    const logEntry = {
      id: newId,
      operation,
      page,
      date: new Date().toLocaleString(),
    };

    logs.push(logEntry);
    localStorage.setItem('logs', JSON.stringify(logs));

    // لتحديث قائمة الجدول على الفور
    this.logsSubject.next(logs);
  }
}
