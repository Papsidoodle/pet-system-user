import { Injectable } from '@angular/core';
import {
  collectionData,
  doc,
  docData,
  docSnapshots,
  Firestore,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { PetsInfo } from 'src/app/models/pets';
import { ProfileUser } from 'src/app/models/user';
import { AuthService } from '../auth/auth.service';
import { collection } from 'firebase/firestore';
import { imgInterface } from 'src/app/pages/homescreen/homescreen.page';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore, private autService: AuthService) { }

  get currenUs$(): Observable<ProfileUser | null> {
    return this.autService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  getAnnoucements(): Observable<any> {
    const data = collection(this.firestore, 'annoucement');
    const annoucements = collectionData(data).pipe(
      map((schedule) => {
        return schedule as imgInterface[];
      })
    );
    return annoucements

  }


  get petInfo$(): Observable<PetsInfo | null> {
    return this.autService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'pets', user?.uid);
        return docData(ref) as Observable<PetsInfo>;
      })
    );
  }

  getUsersInfoById(uid: string): Observable<ProfileUser> {
    const document = doc(this.firestore, `users/${uid}`);
    return docSnapshots(document).pipe(
      map((doc) => {
        const data = doc.data();
        return { ...data } as ProfileUser;
      })
    );
  }

  addUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  addPet(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'pets', user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }
}
