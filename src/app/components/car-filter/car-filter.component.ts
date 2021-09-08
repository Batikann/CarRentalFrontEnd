import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css'],
})
export class CarFilterComponent implements OnInit {
  brands: Brand[];
  colors: Color[];
  selectedColorId:string=null;
  selectedBrandId:string=null;
  routerLink = '';
  constructor(
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllColors();
  }

  getAllColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getAllBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  changeRouteLink() {
    if (this.selectedBrandId !== null && this.selectedColorId !== null) {
      this.routerLink =
        '/cars/brand/' +
        this.selectedBrandId +
        '/color/' +
        this.selectedColorId;
      return this.routerLink;
    }

    // else if (this.selectedBrandId == null && this.selectedColorId !== null) {
    //   this.routerLink = '/cars/color/' + this.selectedColorId;
    //   return this.routerLink;
    // }

    // else if (this.selectedBrandId !== null && this.selectedColorId == null) {
    //   this.routerLink = '/cars/brand/' + this.selectedBrandId;
    //   return this.routerLink;
    // }

    else {
      this.routerLink = '/';
      return this.routerLink;
    }
  }

  changeButtonClass() {
    if (this.selectedBrandId && this.selectedColorId) {
      return 'btn btn-success';
    } else {
      return 'btn btn-success disabled';
    }
  }
}
