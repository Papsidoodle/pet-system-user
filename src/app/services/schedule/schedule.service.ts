import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  where,
  Timestamp,
} from 'firebase/firestore';
import {
  Firestore,
  collectionData,
  docSnapshots,
} from '@angular/fire/firestore';
import { PetsAppointment } from 'src/app/models/pets';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private firestore: Firestore) {}

  getSchedulesByAppId(
    uid: string,
    appointmentReference: string
  ): Observable<PetsAppointment> {
    const schedule = doc(
      this.firestore,
      `pets/${uid}/appointmentSchedule/${appointmentReference}`
    );
    return docSnapshots(schedule).pipe(
      map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as PetsAppointment;
      })
    );
  }

  // query data by petId and appointmentType
  getSchedulesByPetId(
    uid: string,
    petId: string
  ): Observable<PetsAppointment[] | any> {
    const schedules = collection(
      this.firestore,
      `pets/${uid}/appointmentSchedule`
    );
    const queriedSchedule = query(schedules, where('petId', '==', petId));

    const petSchedules = collectionData(queriedSchedule).pipe(
      map((schedule) => {
        return schedule as PetsAppointment[];
      })
    );
    return petSchedules;
  }

  getUnfinishedSchedulesByPetId(
    uid: string,
    petId: string
  ): Observable<PetsAppointment[] | any> {
    const schedules = collection(
      this.firestore,
      `pets/${uid}/appointmentSchedule`
    );
    const currentDate = new Date();
    const queriedSchedule = query(
      schedules,
      where('petId', '==', petId),
      where('appointmentDate', '>', currentDate)
    );

    const petSchedules = collectionData(queriedSchedule).pipe(
      map((appointments) => {
        const highestDates: PetsAppointment[] = [];

        appointments.forEach((appointment) => {
          const { appointmentType, appointmentDate } = appointment;
          if (
            highestDates[appointmentType] == null ||
            appointmentDate.toDate() <
              highestDates[appointmentType].appointmentDate.toDate()
          ) {
            if (appointmentType === 3) {
              console.log({
                appointmentType: appointmentType,
                appointmentDate: appointmentDate.toDate(),
              });
            }
            highestDates[appointmentType] = appointment;
          }
        });
        var finalSchedules = highestDates.filter(
          (value) => Object.keys(value).length !== 0
        );
        return finalSchedules;
      })
    );
    return petSchedules;
  }

  // query data by petId and appointmentType
  getSchedulesByAppType(
    uid: string,
    petId: string,
    appointmentType: number
  ): Observable<PetsAppointment[] | any> {
    const schedules = collection(
      this.firestore,
      `pets/${uid}/appointmentSchedule`
    );
    const currentDate = new Date();
    const queriedSchedule = query(
      schedules,
      where('petId', '==', petId),
      where('appointmentType', '==', appointmentType),
      where('appointmentDate', '<', currentDate)
    );

    const petSchedules = collectionData(queriedSchedule).pipe(
      map((schedule) => {
        console.log(schedule);

        return schedule as PetsAppointment[];
      })
    );
    return petSchedules;
  }
}
