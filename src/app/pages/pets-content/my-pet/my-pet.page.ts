import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetsAppointment, PetsInfo } from 'src/app/models/pets';
// import { PetsAppointment } from 'src/app/models/pets-appointment';
import { ProfileUser } from 'src/app/models/user';
import { PetsInfoService } from 'src/app/services/pet/pets/pets-info.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { UserService } from 'src/app/services/users/user.service';
import { formatDate } from '../../schedule/schedule.page';
import { MedicalHistoryService, PetMedicalHistory } from 'src/app/services/medical-history/medical-history.service';

const appointmentTypes = [
  'AntiRabies Schedule',
  'Deworming Schedule',
  'Kennel Cough Schedule',
  'Tick and Flea / Heartworm Preventative Schedule',
  '5in1 / 6in1 / 8in1',
];
@Component({
  selector: 'app-my-pet',
  templateUrl: './my-pet.page.html',
  styleUrls: ['./my-pet.page.scss'],
})
export class MyPetPage implements OnInit {

  petinfo: PetsInfo;
  public user: ProfileUser;
  pet: PetsInfo[];
  pets: Subscription;
  // public petAppointments: PetsAppointment[];
  petSub: Subscription;
  userSub: Subscription;
  petInfo: Subscription;
  public appointmentTypes = appointmentTypes;
  public apps: PetsAppointment[];
  public selectedAppointment: PetsAppointment;
  
  medicalHistories: PetMedicalHistory[];
  medHistorySub: Subscription; 
  
  appointments: Subscription;
  default = 'assets/palceholder.png'
  constructor(
    private router: Router,
    private userService: UserService,
    private petsService: PetsInfoService,
    private actRoute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private petService: PetsInfoService,
    private medService: MedicalHistoryService,
  ) { }

  ngOnInit() {
    const uid = this.actRoute.snapshot.paramMap.get('uid')
    const petId = this.actRoute.snapshot.paramMap.get('petId');

    (this.userSub = this.userService
      .getUsersInfoById(uid)
      .subscribe((userInfo) => {
        this.user = userInfo;
      })),
      (this.petInfo = this.petsService
        .getUserPet(uid)
        .subscribe((pets: any) => {
          this.pet = pets;
        }))

        this.appointments = this.scheduleService
        .getUnfinishedSchedulesByPetId(uid, petId)
        .subscribe((schedules: any) => {
          const formattedSchedule = schedules?.map((data) => {
            data.appointmentDate = formatDate(data.appointmentDate.toDate());
            return data;
          });
          console.log(formattedSchedule);
          this.apps = formattedSchedule;
        });

    this.pets = this.petService.getPetInfo(uid, petId).subscribe((pet) => {
      this.pet = pet;
      console.log(pet);
    })

    this.medHistorySub = this.medService.getMedicalHistoryByPetId(uid,petId).subscribe((medicalHistory) => {
      medicalHistory.forEach((data) => {
        data.medicalHistoryDate = formatDate(data.medicalHistoryDate.toDate());
        this.medicalHistories = medicalHistory
      })
    })
  }

  goToAppointment(event: any) {
    const route = `schedule/${this.user.uid}/${this.pet[0].petId}/${event.target.value}`
    this.router.navigate([route]);
  }

  goToMedicalHistory(event:any) {
    const route = `/medical-history/${this.user.uid}/${this.pet[0].petId}/${event.target.value}`
    this.router.navigate([route]);
  }

}
