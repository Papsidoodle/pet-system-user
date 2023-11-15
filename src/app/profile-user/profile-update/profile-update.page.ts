import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap } from 'rxjs';
import { ProfileUser } from 'src/app/models/user';
import { ImageUploadService } from 'src/app/services/image/image-upload.service';
import { UserService } from 'src/app/services/users/user.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@UntilDestroy()

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.page.html',
  styleUrls: ['./profile-update.page.scss'],
})
export class ProfileUpdatePage implements OnInit {

  user$ = this.usersService.currenUs$;

  profileForm = this.fb.group({
    uid: [''],
    firstname:[''],
    middlename:[''],
    lastname:[''],
    contact:[],
    houseNo:[],
    street:[''],
    brgy:[''],
  });

  constructor(
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private usersService: UserService,
    private fb: NonNullableFormBuilder,
    private toastcontrol:ToastController,
    private loadingCtrl: LoadingController,
    private auth:AuthService,
    private route:Router,
  ) {}

  ngOnInit(): void {
    this.usersService.currenUs$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }

  uploadFile(event: any, { uid }: ProfileUser) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        switchMap((imgUrl) =>
          this.usersService.updateUser({
            uid,
            imgUrl,
          })
        )
      )
      .subscribe();
  }

  async saveProfile() {
    const {uid,...data} = this.profileForm.value;
    if (!uid) {
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Updating Info',
      spinner: 'circles'
    });

    loading.present();

    this.usersService
      .updateUser({ uid, ...data }).pipe(
        tap(() => {
          this.toastcontrol.create({
            message: 'Profile Updated Successfully',
            duration: 2000,
            color: 'success',
            position: 'bottom'
          }).then(toast => {
            toast.present();
            setTimeout(() => {
              loading.dismiss();
              this.route.navigate(['profile-details']);
            }, 1500)
          });
        })
      ).subscribe();
  }

}
