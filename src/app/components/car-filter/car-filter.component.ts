import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css'],
})
export class CarFilterComponent implements OnInit {
  colors: Color[] = [];
  brands: Brand[] = [];
  selectedBrandId: string = null;
  selectedColorId: string = null;
  routeLink = '';
  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getAllBrand();
    this.getAllColor();
  }

  getAllBrand() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getAllColor() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  changeButtonClass() {
    if (this.selectedBrandId || this.selectedColorId) {
      return 'btn btn-warning';
    } else {
      return 'btn btn-warning disabled';
    }
  }

  changeRouteLink() {
    if (this.selectedBrandId !== null && this.selectedColorId !== null) {
      this.router.navigate(["cars/brand/"+this.selectedBrandId+"/color/"+this.selectedColorId])
    } else if (this.selectedBrandId == null && this.selectedColorId !== null) {
      this.router.navigate(["cars/color/"+this.selectedColorId])
    } else if (this.selectedBrandId !== null && this.selectedColorId == null) {
      this.router.navigate(["cars/brand/"+this.selectedBrandId])
    } else {
      this.router.navigate(["/"])
    }
  }
}
