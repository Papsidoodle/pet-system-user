import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-pass-modal',
  templateUrl: './forgot-pass-modal.page.html',
  styleUrls: ['./forgot-pass-modal.page.scss'],
})
export class ForgotPassModalPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  closeModal() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {
  }

}
