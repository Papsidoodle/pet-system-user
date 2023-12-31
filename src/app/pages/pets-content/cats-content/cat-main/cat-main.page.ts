import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatsInfoService } from 'src/app/services/pet/cats/cats-info.service';
import { CatInfo } from 'src/app/services/pet/cats/cat';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cat-main',
  templateUrl: './cat-main.page.html',
  styleUrls: ['./cat-main.page.scss'],
})
export class CatMainPage implements OnInit {

  public petInfo: CatInfo;
  sub1: Subscription;

  constructor(
    private catservice:CatsInfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ionViewDidEnter() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.catservice.getCatInfotById(id)
    .subscribe(petInfo => {
      if (!petInfo) {
        this.router.navigate(['/cat-main']);
      } else {
        this.petInfo = petInfo;
      }
    });
  }
}
