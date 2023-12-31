import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  UserInfo,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from '@angular/fire/auth';
import { updateProfile } from 'firebase/auth';
import { Observable, concatMap, from, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private fireAuth: AngularFireAuth,
    private alertController: AlertController,
  ) { }

  currentUser$ = authState(this.auth);

  // signup
  signup(email: string, password: string): Observable<UserCredential> {
    const user = from(createUserWithEmailAndPassword(this.auth, email, password).then((result) => {
      console.log(result)
      sendEmailVerification(this.auth.currentUser);
      return result;
    }));
    return user;
  }

  // login
  login(email: string, password: string): Observable<any> {
    const observable = from(signInWithEmailAndPassword(this.auth, email, password).then((result) => {
      console.log(result)
      if (result.user?.emailVerified == false) {
        // this.showAlert('Email Verification', 'Please verify your email address. A verification link has been sent to your email address.');
        sendEmailVerification(this.auth.currentUser);
        this.logout();
      }
    }));
    return observable;
  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });
    await alert.present();
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  // Send password reset email
  sendPasswordResetEmail(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  // Send email verification for the current user

  sendEmailVerification(): Observable<any> {
    const user = this.auth.currentUser;
    console.log(user);
    return of(user).pipe(
      concatMap((user) => {
        if (!user) {
          throw new Error('Not Authenticated');
        }
        return sendEmailVerification(user).then((test) => {
          console.log('email sent', test);
        }).catch((err) => {
          console.log(err);
        });
      })
    );
  }

  // update user info
  updateProfile(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not Authenticated');
        return updateProfile(user, profileData);
      })
    );
  }
}
