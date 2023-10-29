import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./authentication/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'forgot-pass-modal',
    loadChildren: () => import('./authentication/forgot-pass-modal/forgot-pass-modal.module').then( m => m.ForgotPassModalPageModule)
  },
  {
    path: 'homescreen',
    loadChildren: () => import('./pages/homescreen/homescreen.module').then( m => m.HomescreenPageModule)
  },
  {
    path: 'cat-main/:id',
    loadChildren: () => import('./pages/pets-content/cats-content/cat-main/cat-main.module').then( m => m.CatMainPageModule)
  },
  {
    path: 'cat-info/:id',
    loadChildren: () => import('./pages/pets-content/cats-content/cat-info/cat-info.module').then( m => m.CatInfoPageModule)
  },
  {
    path: 'dog-info/:id',
    loadChildren: () => import('./pages/pets-content/dogs-content/dog-info/dog-info.module').then( m => m.DogInfoPageModule)
  },
  {
    path: 'dog-main/:id',
    loadChildren: () => import('./pages/pets-content/dogs-content/dog-main/dog-main.module').then( m => m.DogMainPageModule)
  },
  {
    path: 'cat-meds/:id',
    loadChildren: () => import('./pages/pets-content/cats-content/cat-meds/cat-meds.module').then( m => m.CatMedsPageModule)
  },
  {
    path: 'cat-foods/:id',
    loadChildren: () => import('./pages/pets-content/cats-content/cat-foods/cat-foods.module').then( m => m.CatFoodsPageModule)
  },
  {
    path: 'cat-grooming/:id',
    loadChildren: () => import('./pages/pets-content/cats-content/cat-grooming/cat-grooming.module').then( m => m.CatGroomingPageModule)
  },
  {
    path: 'cat-activities/:id',
    loadChildren: () => import('./pages/pets-content/cats-content/cat-activities/cat-activities.module').then( m => m.CatActivitiesPageModule)
  },
  {
    path: 'dog-foods/:id',
    loadChildren: () => import('./pages/pets-content/dogs-content/dog-foods/dog-foods.module').then( m => m.DogFoodsPageModule)
  },
  {
    path: 'dog-activities/:id',
    loadChildren: () => import('./pages/pets-content/dogs-content/dog-activities/dog-activities.module').then( m => m.DogActivitiesPageModule)
  },
  {
    path: 'dog-grooming/:id',
    loadChildren: () => import('./pages/pets-content/dogs-content/dog-grooming/dog-grooming.module').then( m => m.DogGroomingPageModule)
  },
  {
    path: 'dog-meds/:id',
    loadChildren: () => import('./pages/pets-content/dogs-content/dog-meds/dog-meds.module').then( m => m.DogMedsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },  {
    path: 'verify-email',
    loadChildren: () => import('./authentication/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
