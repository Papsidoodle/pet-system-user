import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { PetInfo } from 'src/app/models/pets';
import { ProfileUser } from 'src/app/models/user';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore, private autService: AuthService) {}

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

  get petInfo$(): Observable<PetInfo | null> {
    return this.autService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'pets', user?.uid);
        return docData(ref) as Observable<PetInfo>;
      })
    );
  }

  addUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  addPet(pet: PetInfo): Observable<void> {
    const ref = doc(this.firestore, 'pets', pet.uid);
    return from(setDoc(ref, pet));
  }

  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }
}
