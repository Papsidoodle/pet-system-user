import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.page.html',
  styleUrls: ['./profile-details.page.scss'],
})
export class ProfileDetailsPage implements OnInit {

  user$ = this.userService.currenUs$;
  
  constructor(private userService: UserService, 
    private route : Router) { }

  ngOnInit(
  ) {
  }

}
