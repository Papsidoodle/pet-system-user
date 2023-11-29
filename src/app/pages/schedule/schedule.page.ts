import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetsAppointment } from 'src/app/models/pets';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

const appointmentTypes = [
  'AntiRabies Schedule',
  'Deworming Schedule',
  'Kennel Cough Schedule',
  'Tick and Flea / Heartworm Preventative Schedule',
  '5in1 / 6in1 / 8in1',
];

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  apps: PetsAppointment[];
  appointments: Subscription;
  userId: string;
  petId: string;
  header: string = '';

  constructor(
    private actRoute: ActivatedRoute,
    private sched: ScheduleService
  ) {}

  ngOnInit() {
    const userId = this.actRoute.snapshot.paramMap.get('uid');
    const petId = this.actRoute.snapshot.paramMap.get('petId');
    this.userId = userId;
    this.petId = petId;
    // const petId = this.actRoute.snapshot.paramMap.get('petId')
    const appType = this.actRoute.snapshot.paramMap.get('appointmentType');

    this.header = appointmentTypes[appType];

    // this.appointments = this.sched
    //   .getSchedulesByPetId(userId, petId)
    //   .subscribe((schedules) => {
    //     this.apps = schedules;
    // });

    this.appointments = this.sched
      .getSchedulesByAppType(userId, petId, Number(appType))
      .subscribe((appointment) => {
        const formattedDates = appointment.map((data) => {
          data.appointmentDate = formatDate(data.appointmentDate.toDate());
        });
        this.apps = appointment;
      });
  }
}
