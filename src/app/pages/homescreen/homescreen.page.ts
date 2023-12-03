import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { Subscription } from 'rxjs';
import { PetsInfo } from 'src/app/models/pets';
import { PetsInfoService } from 'src/app/services/pet/pets/pets-info.service';

export interface imgInterface {
  img: string;
  id: string;
}

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

  public pictures: imgInterface[];
  public pictureSubscription: Subscription;


  userId: any;

  constructor(
    private userService: UserService,
    private petsService: PetsInfoService
  ) { }

  public servicesSlide: any[] = [
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

    this.pictureSubscription = this.userService
      .getAnnoucements()
      .subscribe((annoucements) => {
        this.pictures = annoucements;
        const images = this.pictures.map((picture) => {
          return { img: picture.img };
        });
        this.servicesSlide.push(...images);
        console.log(this.servicesSlide);
      });
  }
}
