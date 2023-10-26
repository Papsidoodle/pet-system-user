import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { from, Observable, of, switchMap, pipe } from 'rxjs';
import { ProfileUser } from 'src/app/models/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore:Firestore, 
    private authService:AuthService
  ) { }

  // get currenUs$():Observable<ProfileUser | null>{
  //   return this.authService.currentUser$.pipe(
  //     switchMap((user: any)=>{
  //       if (!user?.uid){
  //         return of(null);
  //       }
  //       const ref = doc(this.firestore, 'users', user?.uid);
  //       return docData(ref) as Observable<ProfileUser>;
  //     })
  //   );
  // }

  // addUser(user: ProfileUser):Observable<void> {
  //   const ref = doc(this.firestore, 'users', user.uid);
  //   return from(setDoc(ref, user));
  // }

  // updateUser(user: ProfileUser):Observable<void>{
  //   const ref = doc(this.firestore, 'users', user.uid);
  //   return from(updateDoc(ref, {...user}));
  // }
}
