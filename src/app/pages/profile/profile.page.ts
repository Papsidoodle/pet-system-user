import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user$ = this.userService.currenUs$;
  
  constructor(
    private userService: UserService, 
    private route: Router,
    private authService:AuthService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
  }

  // spacing pota
  logout() {
    this.authService.logout().subscribe(async () => {
      const loading = this.loadingCtrl.create({
        message: 'Logging out',
        spinner: 'circles'
      });

      (await loading).present();

      setTimeout(async () => {
        (await loading).dismiss();

        this.route.navigate(['/login']);
      }, 1500);
    });
  }
  
}
