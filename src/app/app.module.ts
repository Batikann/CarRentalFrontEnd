import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule, } from '@angular/forms';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';


import { ToastrModule } from 'ngx-toastr';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterCarPipe } from './pipes/filter-car.pipe';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CarComponent,
    NaviComponent,
    RentalComponent,
    CarDetailComponent,
    FilterColorPipe,
    FilterBrandPipe,
    FilterCarPipe,
    BrandListComponent,
    ColorListComponent,
    CarListComponent,
    ColorAddComponent,
    BrandAddComponent,
    CarAddComponent,
    ColorUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
