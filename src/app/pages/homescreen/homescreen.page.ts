import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { Subscription } from 'rxjs';
import { PetsInfo } from 'src/app/models/pets';
// import { PetsAppointment } from 'src/app/models/pets-appointment';
import { PetsInfoService } from 'src/app/services/pet/pets/pets-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileUser } from 'src/app/models/user';
@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.page.html',
  styleUrls: ['./homescreen.page.scss'],
})
export class HomescreenPage implements OnInit {
  user$ = this.userService.currenUs$;

  public pet: PetsInfo[];

  userSub: Subscription;
  petSub: Subscription;
  petAppointmentsSub: Subscription;
  petInfo: Subscription;

  userId: any;

  constructor(
    private userService: UserService,
    private petsService: PetsInfoService
  ) { }

  servicesSlide: any[] = [
    { title: 'Vaccination', img: '/assets/Services/vacc.jpg' },
    { title: 'Deworming', img: '/assets/Services/deworm.jpg' },
    { title: 'Consultation', img: '/assets/Services/consult.jpg' },
    { title: 'Confinement', img: '/assets/Services/confine.jpg' },
    { title: 'Surgeries', img: '/assets/Services/surg.jpg' },
    { title: 'Pet Boarding', img: '/assets/Services/board.jpg' },
    { title: 'Grooming', img: '/assets/Services/grooming.jpg' },
    { title: 'Home Services', img: '/assets/petbg2.jpg' },
    { title: 'Laboratory', img: '/assets/Services/lab.jpg' },
    { title: 'Direct Microscopy', img: '/assets/Services/micro.jpg' },
    { title: 'Ultrasound', img: '/assets/Services/ultrasound.jpg' },
    { title: 'Urine Analysis', img: '/assets/Services/urine.jpg' },
    { title: 'Complete Blood Chemistry', img: '/assets/Services/complete.jpg' },
  ];
  
  ngOnInit() {
    this.userService.currenUs$.subscribe((res) => {
      const uid = res.uid;

      (
        this.userSub = this.userService
          .getUsersInfoById(uid)
          .subscribe((userInfo) => {
            this.userId = userInfo;
          }
        )
      ),
      (
        this.petInfo = this.petsService
          .getUserPet(uid)
          .subscribe((pets: any) => {
            console.log(pets);
            this.pet = pets;
          }
        )
      )
    });
  }
}
