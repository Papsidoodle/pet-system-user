import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetsInfo } from 'src/app/models/pets';
// import { PetsAppointment } from 'src/app/models/pets-appointment';
import { ProfileUser } from 'src/app/models/user';
import { PetsInfoService } from 'src/app/services/pet/pets/pets-info.service';
import { UserService } from 'src/app/services/users/user.service';

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

  default = 'assets/palceholder.png'
  constructor(
    private userService: UserService,
    private petsService: PetsInfoService,
    private actRoute: ActivatedRoute,
    private petService: PetsInfoService,
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

    this.pets = this.petService.getPetInfo(uid, petId).subscribe((pet) => {
      this.pet = pet;
      console.log(pet);
    })
  }

}
