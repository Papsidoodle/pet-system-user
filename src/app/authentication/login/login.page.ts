import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

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
		private authService: AuthService,
		private router: Router
	) {}

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}
	get password() {
		return this.credentials.get('password');
	}
	
	ngOnInit() {
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8)]]
		});
	}

	async login() {
		const loading = await this.loadingController.create({
      message: 'Logging in',
      spinner: 'circles'
    });

		await loading.present();

		const { email, password } = this.credentials.value;

		// try {
		//   await this.authService.login(email, password).toPromise();
		//   this.router.navigate(['/home']);
    //   this.credentials.reset();

		// } catch (error: any) {
		//   if (error.code === 'auth/user-not-found') {
    //     this.showAlert('Email not registered', 'The provided email is not registered.');
    //     this.credentials.reset();
		//   }
		// } finally {
		//   loading.dismiss();
		// }
	}
	  

	async showAlert(header: any, message: any) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK'],
			cssClass: 'custom-alert',
			translucent: true
		});
		await alert.present();
	}
	
	togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}
	
	// navigate to registration page
	signup(){
		this.router.navigate(['/register']);
		this.credentials.reset();
	}

}
