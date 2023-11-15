import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-pass-modal',
  templateUrl: './forgot-pass-modal.page.html',
  styleUrls: ['./forgot-pass-modal.page.scss'],
})
export class ForgotPassModalPage implements OnInit {

  credentials: FormGroup | any;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
  ) { }

  get email() {
    return this.credentials.get('email');
  }

  closeModal() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  resetPassword() {
    const { email } = this.credentials.value;
    this.authService.sendPasswordResetEmail(email).then(async () => {
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Password reset email has been sent',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              // Dismiss the modal
              this.modalCtrl.dismiss();
            },
          },
        ],
      });

      this.credentials.reset();
      
      await alert.present();
    })
    .catch(async (error: any) => {
      console.log('Error sending password reset email:', error);

      if (error.code === 'auth/user-not-found') {
        const alert = await this.alertController.create({
          header: 'Email Not Found',
          message: 'The email is not registered',
          buttons: ['OK'],
          cssClass: 'custom-alert'
        });

        await alert.present();

      } else {
        // Show an error message in an alert here if needed
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error sending password reset email',
          buttons: ['OK'],
          cssClass: 'custom-alert'
        });
        
        await alert.present();
      }
    })
  }

}
