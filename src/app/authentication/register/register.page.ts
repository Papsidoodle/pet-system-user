import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

import { LoadingController, ToastController } from '@ionic/angular';
import { switchMap } from 'rxjs';

// upload image and camera
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  showPassword: boolean = false;
  credentials : FormGroup | any;
  defaultImg = 'assets/icon/template.png';

  petName: string = '';

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

  get municipality() {
    return this.credentials.get('municipality')
  }

  get province() {
    return this.credentials.get('prov')
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  get imgUrl(){
    return this.credentials.get('imgUrl');
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

      const imgName = new Date().getTime() + '.jpg';

      // storage for the image 
      const filePath = 'user_photos/' + imgName;
      const storage = getStorage();
      const storageRef = ref(storage,filePath)


      const response = await fetch(image.dataUrl)
      const blob = await response.blob();

      const uploadTask = uploadBytes(storageRef,blob)


      uploadTask
      .then((snapshot) =>{
        //image upload success
      })
      .catch((error)=>{
        console.log('Image upload error: ', error)
      })
      .then(async () =>{
        try {
          const downloadURL = await getDownloadURL(storageRef);

          this.credentials.patchValue({imgUrl : downloadURL});
        } catch (error) {
          console.log('Download url error: ',error)
        }
      })
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
      municipality: ['', [Validators.required]],
      prov: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8)]],
      imgUrl: [''],
		})
  }

  async submit() {
    const {firstname, middlename, lastname, contact, houseNo, street, brgy, municipality, prov, email, password, imgUrl} = this.credentials.value;

    const loading = this.loadingCtrl.create({
      message: 'Creating user',
      spinner: 'circles'
    });

    (await loading).present();

    const petName = this.petName;

    this.auth.signup(email, password).pipe(
      switchMap(({ user: {uid} }) =>
        this.userService.addUser({
          uid, firstname, middlename, lastname, contact, houseNo, street, brgy, municipality, prov, email, imgUrl
        }).pipe(
          switchMap(() => this.userService.addPet({
            uid: uid,
          }))
        )
      )
    ).subscribe(async () => {
      setTimeout(async () => {
        (await loading).dismiss();
        
        this.credentials.reset();
        this.route.navigate(['/login']);
      }, 1500);
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
