import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private allowedEmail = 'admin@example.com';
  private allowedPassword = 'securepassword';

  constructor(private auth: Auth) {}

  async login(email: string, password: string): Promise<string | null> {
    if (email !== this.allowedEmail || password !== this.allowedPassword) {
      return 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
    }

    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return null; // نجاح تسجيل الدخول
    } catch (error: any) {
      return error.message; 
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
