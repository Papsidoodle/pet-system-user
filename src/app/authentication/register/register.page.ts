import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

import { ToastController } from '@ionic/angular';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  showPassword: boolean = false;
  credentials : FormGroup | any;

  constructor(
    private auth:AuthService,
    private userService:UserService,
    private fb : FormBuilder,
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

  submit() {
    const {firstname, middlename, lastname, contact, houseNo, street, brgy, email, password} = this.credentials.value;
    
    // this.auth.signup(email, password).pipe(
    //   switchMap(({ user: {uid} }) =>
    //     this.userService.addUser({
    //       uid, firstname, middlename, lastname, contact, houseNo, street, brgy, email, password
    //     })
    //   ),
    // ).subscribe(()=>{
    //   this.route.navigate(['/login']);
    //   this.credentials.reset();
    // })
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
