import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Firestore,
  collectionData,
  docSnapshots,
} from '@angular/fire/firestore';

import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  where,
  Timestamp,
} from 'firebase/firestore';


export interface PetMedicalHistory {
  medicalHistoryDate?: any;
  medicalHistory?: string;
  doctorsNote?: string;
  petId?: string;
  medicalHistoryId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  constructor(private firestore: Firestore) { }

  getMedicalHistoryById(
    uid: string,
    medicalHistoryId: string
  ): Observable<PetMedicalHistory> {
    const medicalHistory = doc(
      this.firestore,
      `pets/${uid}/medicalHistory/${medicalHistoryId}`
    );

    return docSnapshots(medicalHistory)
      .pipe(
        map(doc => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data } as PetMedicalHistory;
        })
      );
  }

  getMedicalHistoryByPetId(
    uid: string,
    petId: string,
  ): Observable<PetMedicalHistory[]> {

    const medicalHistories = collection(
      this.firestore,
      `pets/${uid}/medicalHistory`
    )

    const queriedHistory = query(medicalHistories, where('petId', '==', petId));
    const petMedicalHistory = collectionData(queriedHistory).pipe(
      map((schedule) => {
        return schedule as PetMedicalHistory[];
      })
    );
    return petMedicalHistory;
  }

}
