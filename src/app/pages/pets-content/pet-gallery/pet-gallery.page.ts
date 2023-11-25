import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';
import { Observable } from 'rxjs';
import { CatInfo } from 'src/app/services/pet/cats/cat';
import { CatsInfoService } from 'src/app/services/pet/cats/cats-info.service';
import { DogInfo } from 'src/app/services/pet/dogs/dog';
import { DogsInfoService } from 'src/app/services/pet/dogs/dogs-info.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-pet-gallery',
  templateUrl: './pet-gallery.page.html',
  styleUrls: ['./pet-gallery.page.scss'],
})
export class PetGalleryPage implements OnInit {
  selectedSegment: string = '1';
  public search: string = '';
  public dogInfo: Observable<DogInfo[]>;
  public catInfo: Observable<CatInfo[]>;
  public searchdog: Observable<DogInfo[]>;
  public searchcat: Observable<CatInfo[]>;
  user$ = this.userService.currenUs$;

  pet$ = this.userService.petInfo$;

  constructor(
    private menuCtrl: MenuController,
    private userService: UserService,
    private dogservice: DogsInfoService,
    private catservice: CatsInfoService,
  ) {
    this.dogInfo = this.dogservice.getDogInfoAlphabetically();
    this.catInfo = this.catservice.getCatInfoAlphabetically();
  }

  lottieoptionsdog: AnimationOptions = {
    path: 'assets/json/dog.json',
  };

  lottieoptionscat: AnimationOptions = {
    path: 'assets/json/cat.json',
  };

  segmentChanged() {
    // You can perform actions when the segment changes here if needed.
    // For example, fetch data based on the selected segment.
  }

  // search
  onDogSearch() {
    const searchlower = this.search.trim().toLowerCase();
    console.log('Search: ', searchlower);

    if (searchlower !== '') {
      this.searchdog = this.dogservice.searchDog(searchlower);
    } else {
      this.searchdog = null;
      this.search = '';
    }
  }

  onCatSearch() {
    const searchlower = this.search.trim().toLowerCase();
    console.log('Search: ', searchlower);

    if (searchlower !== '') {
      this.searchcat = this.catservice.searchCat(searchlower);
    } else {
      this.searchcat = null;
      this.search = '';
    }
  }

  ngOnInit() {
  }

}
