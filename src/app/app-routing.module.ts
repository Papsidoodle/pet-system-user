import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['homescreen']);
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./authentication/register/register.module').then( m => m.RegisterPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
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
    loadChildren: () => import('./pages/homescreen/homescreen.module').then( m => m.HomescreenPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
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
    loadChildren: () => import('./profile-user/profile/profile.module').then( m => m.ProfilePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./authentication/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'profile-details',
    loadChildren: () => import('./profile-user/profile-details/profile-details.module').then( m => m.ProfileDetailsPageModule)
  },
  {
    path: 'profile-update/:id',
    loadChildren: () => import('./profile-user/profile-update/profile-update.module').then( m => m.ProfileUpdatePageModule)
  },
  {
    path: 'vaccines',
    loadChildren: () => import('./pages/vaccines/vaccines.module').then( m => m.VaccinesPageModule)
  },
  {
    path: 'corporation',
    loadChildren: () => import('./pages/corporation/corporation.module').then( m => m.CorporationPageModule)
  },
  {
    path: 'pet-gallery',
    loadChildren: () => import('./pages/pets-content/pet-gallery/pet-gallery.module').then( m => m.PetGalleryPageModule)
  },
  {
    path: 'my-pet/:uid/:petId',
    loadChildren: () => import('./pages/pets-content/my-pet/my-pet.module').then( m => m.MyPetPageModule)
  },
  {
    path: 'schedule/:uid/:petId/:appointmentType',
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
