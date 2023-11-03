import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ForgotPassModalPage } from '../forgot-pass-modal/forgot-pass-modal.page';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup | any;
  showPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private router: Router
  ) {}

  // forgot pass modal
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ForgotPassModalPage,
    });

    modal.present();
  }

  // get input values
  get email() {
    return this.credentials.get('email');
  }
  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
	
    const loading = await this.loadingController.create({
      message: 'Logging in',
      spinner: 'circles',
    });

    const { email, password } = this.credentials.value;

    try {
      await firstValueFrom(this.authService.login(email, password));
      await loading.present();
      
      setTimeout(() => {
        loading.dismiss();

        this.credentials.reset();
        this.router.navigate(['/homescreen']);
      }, 1400);

    } catch (error: any) {
      
      // email not found
      if (error.code === 'auth/user-not-found') {
        this.showAlert(
          'Email Not Found!',
          'The provided email is not registered.'
        );

        loading.dismiss();
      }

      if (error.code === 'auth/wrong-password') {
        this.showAlert(
          'Invalid Password!',
          'Your password is incorrect.'
        );

        loading.dismiss();
      }
    }
  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });
    await alert.present();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // navigate to registration page
  signup() {
    this.router.navigate(['/register']);
    this.credentials.reset();
  }
}
