import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/details/:carId",component:CarDetailComponent},
  {path:"brands/list",component:BrandListComponent},
  {path : "cars/brand/:brandId/color/:colorId" , component : CarComponent},
  {path:"colors/list",component:ColorListComponent},
  {path:"cars/list",component:CarListComponent},
  {path:"colors/add",component:ColorAddComponent},
  {path:"brands/add",component:BrandAddComponent},
  {path:"cars/add",component:CarAddComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
