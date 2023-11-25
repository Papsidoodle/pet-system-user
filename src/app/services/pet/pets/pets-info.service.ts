import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docSnapshots
} from '@angular/fire/firestore';
import { orderBy, query, setDoc, where } from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
// import { PetsAppointment } from 'src/app/models/pets-appointment';
import { PetsInfo } from '../../../models/pets';

@Injectable({
  providedIn: 'root'
})
export class PetsInfoService {
  
  constructor(private firestore: Firestore) {}

  public pet: Observable<PetsInfo>;

  getUserPet(uid: string): Observable<PetsInfo[] | any> {
    const ref = collection(this.firestore, `pets/${uid}/petInfo`);
    const pets = query(ref, orderBy('petName'));

    return collectionData(pets)
      .pipe(
        map((pet) => {
          console.log(pet);
          return pet as PetsInfo;
        })
      )
  }

  getPetInfo(uid: string, petId: string): Observable<PetsInfo | any> {
    const ref = collection(this.firestore, `pets/${uid}/petInfo`);
    const pet = query(ref, where('petId', '==', petId));

    return collectionData(pet).pipe(
      map((pet) => {
        return pet as PetsInfo[];
      })
    );
  }
}
