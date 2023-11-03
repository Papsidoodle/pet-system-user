import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

import { LoadingController, ToastController } from '@ionic/angular';
import { switchMap } from 'rxjs';

// upload image and camera
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  showPassword: boolean = false;
  credentials : FormGroup | any;

  imgHandler: string;
  newImg: string;
  defaultImg = 'assets/icon/template.png';

  constructor(
    private auth:AuthService,
    private userService:UserService,
    private fb : FormBuilder,
    private loadingCtrl: LoadingController,
    private toast : ToastController,
    private route: Router,
  ) { }

  // get the form value 
  get firstname() {
    return this.credentials.get('firstname');
  }

  get middlename() {
    return this.credentials.get('middlename');
  }

  get lastname() {
    return this.credentials.get('lastname');
  }

  get contact() {
    return this.credentials.get('contact');
  }

  get houseNo() {
    return this.credentials.get('houseNo');
  }

  get street() {
    return this.credentials.get('street');
  }

  get brgy() {
    return this.credentials.get('brgy');
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  // camera function
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        saveToGallery: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
        correctOrientation: true
      });

      this.imgHandler = image.dataUrl;
      this.newImg = this.imgHandler;

    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
    //form validation
    this.credentials = this.fb.group({
      firstname: ['', [Validators.required]],
      middlename: [''],
      lastname:['', [Validators.required]],
      contact:['', [Validators.required]],
      houseNo:[''],
      street:['', [Validators.required]],
      brgy:['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8)]],
		})
  }

  async submit() {
    const {firstname, middlename, lastname, contact, houseNo, street, brgy, email, password} = this.credentials.value;

    const loading = this.loadingCtrl.create({
      message: 'Creating user',
      spinner: 'circles'
    });

    (await loading).present();

    this.auth.signup(email, password).pipe(
      switchMap(({ user: {uid} }) =>
        this.userService.addUser({
          uid, firstname, middlename, lastname, contact, houseNo, street, brgy, email
        })
      ),
    ).subscribe(async () => {
      
      setTimeout(async () => {
        (await loading).dismiss();
        
        this.credentials.reset();
        this.route.navigate(['/login']);
      }, 1400);
    });

    // ayusin mo na lang yon trycatch lang sakin yon e
  }

  // navigate to login page
  login() {
    this.route.navigate(['/login'])
    this.credentials.reset();
  }

  async showtoast() {
    const toast = await this.toast.create({
      message: 'Registration Success',
      duration: 2000,
      position: 'bottom'
    });

    await toast.present();
  }

  togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}
}
